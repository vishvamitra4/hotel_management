const Base = require("../base");
class CancelBooking extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "cancelBooking": ["validateUser"]
        }
    };

    // getting all dates between checkin to checkout..
    getDateRange(checkIn, checkOut) {
        const dateArray = [];
        let currDate = new Date(checkIn); // Parse checkIn to Date object
        const checkOutDate = new Date(checkOut); // Parse checkOut to Date object

        while (currDate < checkOutDate) { // Not including the checkout date
            dateArray.push(new Date(currDate)); // Push a copy of the current date
            // Increment the current date by 1 day
            currDate.setDate(currDate.getDate() + 1);
        }

        return dateArray;
    };

    // cancel bookings...
    async cancelBooking(A = null) { // checking is getting paramets or not...
        let bookingId;
        if(A.length == 0){
            bookingId = this.ctx.params._id;
        }else bookingId = A;
        // if bookingid is not present..
        if (!bookingId) {
            this.throwError("404", "Booking Not Found!");
        };
        // fetching the booking...
        const booking = await this.models.Booking.findOne({ _id: bookingId });
        // updating the bookinstatus..
        try {
            await this.models.Booking.updateOne(
                { _id: bookingId },
                { $set: { bookingStatus: 'canceled' } }
            );

            const bookingDetail = booking.bookingDetail; // fetching bookingDetail..
            for (const B of bookingDetail) { // iterating to each room details..
                const { selectedRoomType, numRooms, checkIn, checkOut } = B;

                // dates to update...
                const dateRange = this.getDateRange(checkIn, checkOut);

                for (const date of dateRange) { // iterating to all dates of dateRange...
                    await this.models.Hotel.updateOne({
                        _id: booking.bookingHotel, // finding the particular hotel...
                        'hotelRoomsDetail.roomType': selectedRoomType, // matching a particular roomtype...
                        'hotelRoomsDetail.bookedDates.dateOfBooking': date // matching the exact date...
                    }, {
                        $inc: {
                            'hotelRoomsDetail.$.bookedDates.$[elem].totalBookings': -numRooms // decrementing the value...
                        }
                    }, {
                        arrayFilters: [{ 'elem.dateOfBooking': date }] // uodating the matching date onyl...
                    }
                    );
                };
            };

            this.ctx.body = {
                success : true,
                message : "Canceled!"
            };

        }catch(e){
            console.log(e);
            this.throwError("201" , "Not Canceled")
        }

    }
};

module.exports = CancelBooking;
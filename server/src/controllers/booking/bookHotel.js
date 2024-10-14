const Base = require("../base");
const validation = require("../../validations");
const { default: mongoose } = require("mongoose");

class BookHotel extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "bookHotel": ["validateUser"]
        };
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

    async updateBookedDates(hotelId, selectedRoomType, datesToBook, numRooms) {
        // Iterating through dates..
        for (const date of datesToBook) {
            // checking whether that date is already is present or not..
            const result = await this.models.Hotel.updateOne(
                {
                    _id: hotelId,
                    'hotelRoomsDetail.roomType': selectedRoomType,
                    'hotelRoomsDetail.bookedDates.dateOfBooking': date // matchin the date..
                },
                {
                    $inc: {
                        'hotelRoomsDetail.$.bookedDates.$[elem].totalBookings': numRooms // Increment totalBookings
                    }
                },
                {
                    arrayFilters: [{ 'elem.dateOfBooking': date }] // matching the date..
                }
            );
            // If the date was not found (no documents were modified), insert the new date
            if (result.modifiedCount === 0) { // if the that was not present then then update the bookingdate..
                await this.models.Hotel.updateOne(
                    {
                        _id: hotelId,
                        'hotelRoomsDetail.roomType': selectedRoomType
                    },
                    {
                        $push: {
                            'hotelRoomsDetail.$.bookedDates': {
                                dateOfBooking: date,
                                totalBookings: numRooms
                            }
                        }
                    }
                );
            }
        }
    };



    async bookHotel() {
        const { value, error } = validation.Booking.BookingDetail.bookingValidationSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Data Validation Failed..");
        };
        if (value.available == "Not Available") { // checking request should have come with availability...
            this.throwError("404", "Rooms Are Not Available");
        };

        // fetchin hotelName detail...
        const {hotelName} = await this.models.Hotel.findOne({ _id: value.bookingHotel } , {_id : 0 , hotelName : 1});
        const newBooking = new this.models.Booking({
            _id: new mongoose.Types.ObjectId(),
            bookingUser: value.bookingUser,
            bookingHotel: value.bookingHotel,
            bookingHotelName : hotelName,
            bookingDetail: value.bookingDetail,
            bookingStatus: value.bookingStatus,
            grandCost: value.grandCost
        });
        // console.log(newBooking);

        try {
            await newBooking.save();

            // updating all rooms detail by updating bookedDate into each roomType... 
            for (const booking of value.bookingDetail) {
                const { selectedRoomType, numRooms, checkIn, checkOut } = booking;
                // getting all dates for that booking...
                const datesToBook = this.getDateRange(checkIn, checkOut);
                // uodating the data into into hotel models for each dates..
                await this.updateBookedDates(value.bookingHotel, selectedRoomType, datesToBook, numRooms);

            }
        } catch (err) {
            console.log(err);
            this.throwError("301");
        };

        this.ctx.body = {
            success: true,
            message: "Boking done..",
            data: newBooking
        }
    };
};

module.exports = BookHotel;
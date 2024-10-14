const Base = require("../base");

class CancelBooking extends Base {
    constructor(ctx, next) {
        super(ctx, next);
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
    async cancelBooking() {
        const bookingId = this.ctx.params._id;

        if (!bookingId) {
            this.throwError("404", "Booking Not Found!");
        };

        const booking = await this.models.Booking.findOne({_id : bookingId});

        // updating the booking status to canceled...
        await this.models.Booking.updateOne(
            { _id: bookingId },
            { $set: { bookingStatus: 'canceled' } }
        );

        // // updating bookeddate for rach type of room types...
        // const bookingDetail = booking.bookingDetail;
        // for
    }
};

module.exports = CancelBooking;
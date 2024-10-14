const Base = require("../base");
const validation = require("../../validations");
const { default: mongoose } = require("mongoose");

class FetchBooking extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "fetchBooking": ["validateUser"]
        };
    }

    async fetchBooking() {
        const userId = this.ctx.params._id;
        const { hotelName, createdAt , flag } = this.ctx.query; // getting query parameters.
        if (!userId) {
            this.throwError("404", "User Not Found!");
        }

        try {
            // Create filter object
            let filter = {}
            console.log(flag);
            if(flag == "false") { // checking that person it admin or not...
                filter.bookingUser = userId;
            }
            if (hotelName) {
                filter.bookingHotelName = { $regex: hotelName, $options: "i" }; // case insesitive match...
            }
            if (createdAt) {
                const date = new Date(createdAt); 
                filter.created = { $gte: new Date(date.setHours(0, 0, 0)), $lt: new Date(date.setHours(23, 59, 59)) }; // covering full date..
            }
            const bookings = await this.models.Booking.find(filter).sort({created : -1}); // getting all new bookings first..
            this.ctx.body = {
                success: true,
                message: "All Bookings Fetched.",
                data: bookings
            };
        } catch (e) {
            console.log(e);
            this.throwError("404", "Booking Not Found For User..");
        }
    }
}

module.exports = FetchBooking;

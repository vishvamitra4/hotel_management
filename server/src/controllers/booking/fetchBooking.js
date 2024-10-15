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
        const { hotelName, createdAt, flag, bookingStatus } = this.ctx.query; // getting query parameters.
        if (!userId) {
            this.throwError("404", "User Not Found!");
        }

        try {
            // Create filter object
            let filter = {};
            console.log(flag);
            if (flag == "false") { // checking if the person is admin or not...
                filter.bookingUser = userId;
            }
            if (hotelName) {
                filter.bookingHotelName = { $regex: hotelName, $options: "i" }; // case insensitive match...
            }
            if (createdAt) {
                const date = new Date(createdAt);
                filter.created = { $gte: new Date(date.setHours(0, 0, 0)), $lt: new Date(date.setHours(23, 59, 59)) }; // covering the full date..
            }
            if (bookingStatus) {
                filter.bookingStatus = bookingStatus;
            }

            // Fetch bookings and populate user and hotel details
            const bookings = await this.models.Booking.find(filter)
                .populate({
                    path: 'bookingUser', // Populating the user details
                    select: 'userName userEmail userPhoneNumber' // Select only necessary fields
                })
                .populate({
                    path: 'bookingHotel', // Populating the hotel details
                    select: 'hotelName hotelCity hotelState' // Select only necessary fields
                })
                .sort({ created: -1 }); // Sorting by newest bookings first

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

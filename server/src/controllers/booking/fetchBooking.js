const Base = require("../base");

class FetchBooking extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "fetchBooking": ["validateUser"]
        };
    }

    async fetchBooking() {
        const userId = this.ctx.params._id;
        const { hotelName, createdAt, flag, bookingStatus } = this.ctx.query;
        if (!userId) {
            this.throwError("404", "User Not Found!");
        }

        try {
            let filter = {};
            if (flag == "false") { // checking if the person is admin or not...
                filter.bookingUser = userId;
            }
            if (hotelName) {
                filter.bookingHotelName = { $regex: hotelName, $options: "i" }; 
            }
            if (createdAt) {
                const date = new Date(createdAt);
                filter.created = { $gte: new Date(date.setHours(0, 0, 0)), $lt: new Date(date.setHours(23, 59, 59)) };
            }
            if (bookingStatus) {
                filter.bookingStatus = bookingStatus;
            }

            const bookings = await this.models.Booking.find(filter)
                .populate({
                    path: 'bookingUser', 
                    select: 'userName userEmail userPhoneNumber' 
                })
                .populate({
                    path: 'bookingHotel', 
                    select: 'hotelName hotelCity hotelState'
                })
                .sort({ created: -1 }); // sorting by newest bookings first..

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

const validation = require("../../validations");
const { default: mongoose } = require("mongoose");
const Booking = require('./booking');

class BookHotel extends Booking {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "bookHotel": ["validateUser"]
        };
    }

    async updateBookedDates(hotelId, selectedRoomType, datesToBook, numRooms) {

        // finding the existing hotelRoomdetail of a particular roomtype roomtype in hotel...
        const hotel = await this.models.Hotel.findOne(
            {
                _id: hotelId,
                'hotelRoomsDetail.roomType': selectedRoomType
            },
            { 'hotelRoomsDetail.$': 1 } 
        );

        if (!hotel || !hotel.hotelRoomsDetail.length) {
            this.throwError("404" , "HotelDetail not found of this type...")
        }

        const bookedDates = hotel.hotelRoomsDetail[0].bookedDates || [];
        // all exsting date and newdate...
        const existingDates = [];
        const newDates = [];

        for (let date of datesToBook) {
    
            const found = bookedDates.find(b => new Date(b.dateOfBooking).getTime() === new Date(date).getTime());
            if (found) {
                existingDates.push(date);
            } else {
                newDates.push({ dateOfBooking: date, totalBookings: numRooms }); 
            }
        }
        if (existingDates.length > 0) {
            await this.models.Hotel.updateOne(
                {
                    _id: hotelId,
                    'hotelRoomsDetail.roomType': selectedRoomType
                },
                {
                    $inc: {
                        'hotelRoomsDetail.$.bookedDates.$[elem].totalBookings': numRooms
                    }
                },
                {
                    arrayFilters: [{ 'elem.dateOfBooking': { $in: existingDates } }]
                }
            );
        }

        if (newDates.length > 0) {
            await this.models.Hotel.updateOne(
                {
                    _id: hotelId,
                    'hotelRoomsDetail.roomType': selectedRoomType
                },
                {
                    $push: {
                        'hotelRoomsDetail.$.bookedDates': { $each: newDates }
                    }
                }
            );
        }
    }


    async bookHotel() {
        const { value, error } = validation.Booking.BookingDetail.bookingValidationSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Data Validation Failed.");
        }
        if (value.available == "Not Available") { 
            this.throwError("404", "Rooms Are Not Available");
        }

        const newBooking = new this.models.Booking({
            _id: new mongoose.Types.ObjectId(),
            bookingUser: value.bookingUser,
            bookingHotel: value.bookingHotel,
            bookingDetail: value.bookingDetail,
            bookingStatus: value.bookingStatus,
            grandCost: value.grandCost
        });

        try {
            await newBooking.save();
            
            for (const booking of value.bookingDetail) {
                const { selectedRoomType, numRooms, checkIn, checkOut } = booking;
                const datesToBook = this.getDateRange(checkIn, checkOut);

                await this.updateBookedDates(value.bookingHotel, selectedRoomType, datesToBook, numRooms);
            }
        } catch (err) {
            console.log(err);
            this.throwError("301", "Sorry, we are facing some error.");
        }

        this.ctx.body = {
            success: true,
            message: "Booking done.",
            data: newBooking
        };
    }
}

module.exports = BookHotel;

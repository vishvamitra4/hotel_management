const Booking = require('./booking');

class CheckingRoomAvailability extends Booking {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async checkingRoomAvailability() {
        const { checkIn, checkOut, roomType, hotelId, numRooms } = this.ctx.request.body;

        if(!checkIn || !checkOut || !roomType || !hotelId || !numRooms){
            this.throwError("404" , "requested data is not completed..")
        }
        // finding hotel..
        const hotel = await this.models.Hotel.findOne(
            { _id: hotelId, 'hotelRoomsDetail.roomType': roomType },
            { 'hotelRoomsDetail.$': 1 }
        );
        if (!hotel) {
            this.throwError("404", "Hotel or room type not found.");
        }


        const roomDetail = hotel.hotelRoomsDetail[0]; // accesssing the detail of that room type..

        // basic condition would be numRooms can't exceed the totalRooms of a particular roomType..
        if (numRooms > roomDetail.totalRooms) { // if numRoom more that totalrooms
            this.throwError('404', "Not Enough Rooms Available for the time range")
        };


        const datesToCheck = this.getDateRange(checkIn, checkOut); // generating the date rnange...
        const bookedDates = roomDetail.bookedDates; // this would be all booked date of that type..
        // console.log(datesToCheck, bookedDates);

        // mapping for no of total booking we have for each day...
        const dateBookingMap = {};

        bookedDates.forEach((booking) => {
            dateBookingMap[booking.dateOfBooking] = booking.totalBookings;
        });
        // checking is that date available in booking map or not..
        for (const date of datesToCheck) {
            if (dateBookingMap[date] > 0) { // if that date already in bookedDate array..
                if (dateBookingMap[date] + Number(numRooms) > roomDetail.totalRooms) { // then checking
                    this.throwError('404', "Not Enough Rooms Available for the time range")
                };
            }
        };

        // if that loop ended it means rooms are available...
        this.ctx.body = {
            success : true,
            message : "Available",
        };
    };

};

module.exports = CheckingRoomAvailability;
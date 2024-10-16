const Base = require("../base");


class Booking extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "getDateRange" : ["validateUser"]
        };
    };

    getDateRange(checkIn, checkOut) {
        const dateArray = [];
        let currDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        while (currDate < checkOutDate) { 
            dateArray.push(new Date(currDate));
        
            currDate.setDate(currDate.getDate() + 1);
        }

        return dateArray;
    }
}

module.exports = Booking;

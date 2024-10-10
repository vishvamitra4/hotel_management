const mongoose = require("mongoose");
const Base = require("./base");

class FetchHotels extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async fetchHotels() {
        try {
            const hotels = await this.models.Hotel.find({});
            this.ctx.body = {
                success: true,
                message: "Fetching Hotel Successfull",
                data: hotels
            };
        } catch (e) {
            this.throwError("404", "Something Went Wrong!");
        }
    };

    async fetchHotelsById() {
        const _id = this.ctx.params._id;
        console.log(_id);
        try {
            // Use lean() to return a plain JavaScript object instead of a Mongoose document
            // mogoose document contain the different methods as weel like .save // .remove..
            const hotel = await this.models.Hotel.findById(_id).lean();

            if (hotel) {
                this.ctx.body = {
                    success: true,
                    message: "Hotel Found!",
                    data: hotel
                };
            } else {
                throw new Error("Hotel Not Found");
            }
        } catch (e) {
            console.log(e);
            this.throwError("404", e.message);
        }
    }

};


module.exports = FetchHotels;
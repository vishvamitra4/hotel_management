const mongoose = require("mongoose");
const Base = require("./base");

class FetchHotels extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
        };
    };

    async fetchHotels() {
        const { search, zipcode, city, state } = this.ctx.query;

        let filter = {};
        if (search != undefined) {
            filter.hotelName = { $regex: search, $options: "i" };
        };
        if (zipcode != undefined) {
            filter.hotelZipcode = { $regex: zipcode, $options: "i" };
        };
        if (city != undefined) {
            filter.hotelCity = { $regex: city, $options: "i" };
        };
        if (state != undefined) {
            filter.hotelState = { $regex: state, $options: "i" };
        }
        try {
            const hotels = await this.models.Hotel.find(filter);
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

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            this.ctx.body = {
                success: false,
                message: "Invalid Hotel ID format"
            };
            return;
        }

        try {
            // lean() to return a plain JavaScript object instead of a Mongoose document
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
        };
    };

};


module.exports = FetchHotels;
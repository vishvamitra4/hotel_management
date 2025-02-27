const Base = require('../base');
const Validation = require('../../validations');
const { default: mongoose } = require('mongoose');

class AddHotel extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "addHotel": ["validateAdmin"],
        };
    };


    // checking the hotel name is present in database or not...
    async checkingHotelName() {
        const { hotelName } = this.ctx.request.body;
        const hotel = await this.models.Hotel.findOne({ hotelName });
        if (hotel) {
            this.throwError("201", "This hotel name is not available");
        };

        this.ctx.body = {
            success: true,
            message: "Hotel name is available"
        };
    };

    // adding a particular hotel..
    async addHotel() {
  
        const { value, error } = Validation.Hotel.Hotel.hotelSchema.validate(this.ctx.request.body);
        if (error) {
            this.throwError("201", "Given data is not validated.");
        }


        const newHotel = new this.models.Hotel({
            _id: new mongoose.Types.ObjectId(),
            hotelName: value.hotelName,
            hotelStar: value.hotelStar,
            hotelRating: value.hotelRating || 5,
            hotelDescription: value.hotelDescription,
            hotelTags: value.hotelTags || [],
            hotelImages: value.hotelImages || [],
            hotelStreet: value.hotelStreet,
            hotelCity: value.hotelCity,
            hotelState: value.hotelState,
            hotelZipcode: value.hotelZipcode,
            hotelGoogleMapUrl: value.hotelGoogleMapUrl,
            hotelOwnerName: value.hotelOwnerName,
            hotelOwnerEmail: value.hotelOwnerEmail,
            hotelOwnerContacts: value.hotelOwnerContacts,
            hotelRoomTypes: value.hotelRoomTypes,
            hotelRoomsDetail: value.hotelRoomsDetail
        });
        try {
            await newHotel.save();
        } catch (err) {
            this.throwError("301", "Error while saving hotel data.");
        };

        this.ctx.body = {
            success: true,
            message: "Hotel added successfully",
            data: newHotel
        };

    };


};


module.exports = AddHotel;
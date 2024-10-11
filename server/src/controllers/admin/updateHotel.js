const Base = require('../base');
const Validation = require('../../validations');

class UpdateHotel extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "updateHotel": ["validateAdmin"]
        };
    };


    async updateHotel() {

        const hotelId = this.ctx.params._id;


        const { value, error } = Validation.Hotel.Hotel.hotelSchema.validate(this.ctx.request.body);
        if (error) {
            console.log(error);
            this.throwError("201", "Given data is not validated.");
        }

        try {
            const updatedHotel = await this.models.Hotel.findByIdAndUpdate(
                hotelId,
                {
                    $set: {
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
                    }
                },
                { new: true }
            );

            if (!updatedHotel) {
                this.throwError("404", "Hotel not found.");
            }

            this.ctx.body = {
                success: true,
                message: "Hotel updated successfully",
                data: updatedHotel
            };

        } catch (err) {
            this.throwError("301", "Error while updating hotel data.");
        }
    }


};


module.exports = UpdateHotel;
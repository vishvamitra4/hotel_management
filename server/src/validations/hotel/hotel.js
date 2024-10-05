const Joi = require('joi');


const hotelSchema = Joi.object({
    hotelName: Joi.string().min(1).max(60).required(),
    hotelStar: Joi.number().min(1).max(8).required(),
    hotelRating: Joi.number().min(0).max(5).default(0),
    hotelDescription: Joi.string().required(),
    hotelTags: Joi.array().items(Joi.string()).default([]),
    hotelImages: Joi.array().items(Joi.string().uri()).default([]),
    hotelStreet: Joi.string().required(),
    hotelCity: Joi.string().required(),
    hotelState: Joi.string().required(),
    hotelZipcode: Joi.string().required(),
    hotelGoogleMapUrl: Joi.string().uri().required(),
    hotelOwnerName: Joi.string().required(),
    hotelOwnerEmail: Joi.string().email().required(),
    hotelOwnerContacts: Joi.array().items(Joi.string().pattern(/^[0-9]+$/)).required(),
    hotelRoomTypes: Joi.array().items(Joi.string()).required(),
    hotelRoomsDetail: Joi.array().items(
        Joi.object({
            roomType: Joi.string().required(),
            roomDetail: Joi.string().required(),
            totalRooms: Joi.number().min(1).required(),
            pricePerDay: Joi.number().min(0).required(),
            bookedDates: Joi.array().items(Joi.date()).default([])
        })
    ).required()
});


module.exports = {
    hotelSchema
}
const Joi = require('joi');
const constants = require('../../models/booking/constants');

const bookingValidationSchema = Joi.object({
    bookingUser: Joi.string().required(),
    bookingHotel: Joi.string().required(),
    bookingDetail: Joi.array().items(
        Joi.object({
            selectedRoomType: Joi.string().required(),  // room type is a string and required
            numRooms: Joi.number().integer().min(1).required(),  // total rooms is a number and required, min 1
            checkIn: Joi.date().iso().required(),  // start date should be in ISO format (string), required
            checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required(),  // end date should be greater than start date
            totalCost: Joi.number().greater(0).required(),
            available: Joi.string().required()
        })
    ).min(1).required(),  // at least one room detail should be provided
    bookingStatus: Joi.string().valid(...constants.bookingStatus).required(),
    grandCost: Joi.number().greater(0).required(),  // total cost is a number greater than 0
});

module.exports = { bookingValidationSchema }

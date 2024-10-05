const { Schema } = require('mongoose');
const constants = require('./constants');

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    bookingUser: { // user of that booking...
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingHotel: { // hotel of that booking...
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    bookingDetails: [{ // it will store all types of rooms and their counts..
        roomType: { // type of room user is booking
            type: String,
            required: true
        },
        totalRooms: { // total room of that particular type...
            type: Number,
            required: true
        },
        startDate: { // star date to end date..
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        bookingStatus: { // what is current status..
            type: String,
            enum: constants.bookingStatus,
            default : constants.bookingStatus[1], // "confirmed"
            required: true
        }
    }],
    totalCost: { // total cost of particular booking...
        type: Number,
        required: true
    }
}, {
    collection: 'bookings',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified'
    },
    versionKey: false
});

module.exports = schema;

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
    bookingHotelName : {
        type : String,
        required : true
    },
    bookingDetail: [{ // it will store all types of rooms and their counts..
        selectedRoomType: { // type of room user is booking
            type: String,
            required: true
        },
        numRooms: { // total room of that particular type...
            type: Number,
            required: true
        },
        checkIn: { // star date to end date..
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        totalCost: {
            type: Number
        },
    }],
    bookingStatus: { // what is current status..
        type: String,
        enum: constants.bookingStatus,
        default: constants.bookingStatus[1], // "confirmed"
        required : true
    },
    grandCost: { // total cost of particular booking...
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

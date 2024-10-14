const { Schema } = require('mongoose');

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    hotelName: {
        type: String,
        minLength: 1,
        maxLength: 60,
        required: true,
        unique: true
    },
    hotelStar: {
        type: Number,
        required: true,
        min: 1,
        max: 8,
        default: 1
    },
    hotelRating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    hotelDescription: {
        type: String,
        required: true
    },
    hotelTags: {
        type: [String],
        default: []
    },
    hotelImages: {
        type: [String],
        default: []
    },
    hotelStreet: {
        type: String,
        required: true
    },
    hotelCity: {
        type: String,
        required: true
    },
    hotelState: {
        type: String,
        required: true
    },
    hotelZipcode: {
        type: String,
        required: true
    },
    hotelGoogleMapUrl: {
        type: String,
        required: true
    },
    hotelOwnerName: {
        type: String,
        required: true
    },
    hotelOwnerEmail: {
        type: String,
        required: true,
    },
    hotelOwnerContacts: {
        type: [String],
        required: true
    },
    hotelRoomTypes: {
        type: [String],
        required: true
    },
    hotelRoomsDetail: [{
        roomType: {
            type: String,
            required: true
        },
        roomDetail: {
            type: String,
            required: true,
        },
        totalRooms: {
            type: Number,
            required: true
        },
        pricePerDay: {
            type: Number,
            required: true
        },
        bookedDates: [{
            dateOfBooking: {
                type: Date,
                required: true,
            },
            totalBookings: {
                type: Number,
                required: true,
                default: 0
            }
        }]
    }]
}, {
    collection: 'hotels',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified'
    },
    versionKey: false
});

module.exports = schema;

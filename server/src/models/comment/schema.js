const { Schema} = require('mongoose');

const schema = new Schema({
    _id : Schema.Types.ObjectId,
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',  
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    givenRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    imageUrl: {
        type: String,
        default: ''
    }
}, {
    collection: 'comments',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified'
    },
    versionKey: false
});

module.exports = schema;

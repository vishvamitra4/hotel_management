const { Schema} = require('mongoose');

const schema = new Schema({
    _id : Schema.Types.ObjectId,
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',  
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    collection: 'comments',
    timestamps: {
        createdAt: 'created',
        updatedAt: 'modified'
    },
    versionKey: false
});

module.exports = schema;

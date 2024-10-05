const { Schema } = require('mongoose');

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,  
        minLength: 1,
        maxLength: 50
    },
    userEmail: {
        type: String,
        required: true,  
        unique: true
    },
    userPassword: {
        type: String,
        required: true,
        bcrypt : true 
    },
    userPhoneNumber: {
        type: String,
        required: true,  
        unique: true
    }
}, {
    collection: "users",
    timestamps: {
        createdAt: "created",
        updatedAt: "modified"
    },
    autoCreate: false,
    versionKey: false
});


schema.plugin(require('mongoose-bcrypt'));

module.exports = schema;

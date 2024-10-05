const Base = require('../base.js');
const Validation = require('../../validations');
const { default: mongoose } = require("mongoose");

class Register extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };


    async register() {

        const { value, error } = Validation.User.Auth.registerSchema.validate(this.ctx.request.body);
        if (error) {
            this.throwError("201", "Input Data is not validated");
        };

        let user = await this.models.User.findOne({ userEmail: value.userEmail });
        if (user) { // user already present...
            this.throwError("201", "User is already Present");
        };
        // creating new user...
        const newUser = new this.models.User({
            _id: new mongoose.Types.ObjectId(),
            userName: value.userName,
            userEmail: value.userEmail,
            userPassword: value.userPassword,
            userPhoneNumber: value.userPhoneNumber
        });
        try {
            await newUser.save();
        } catch (e) {
            console.log(e);
            this.throwError("301");
        };

        this.ctx.body = {
            success: true,
            message: "new user is created",
            data: { user: newUser }
        };
    };
};

module.exports = Register;
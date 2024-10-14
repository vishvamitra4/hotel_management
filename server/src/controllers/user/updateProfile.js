const Base = require('../base.js');
const jwt = require('jsonwebtoken');
const Validation = require("../../validations");

class UpdateProfile extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "updateProfile": ["validateUser", "checkingEmailPresent"]
        };
    };


    async checkingEmailPresent() {
        const _id = this.ctx.params._id;
        const { userEmail } = this.ctx.request.body;
        // checking whether that email is present in DB or not..
        const user = await this.models.User.findOne({ userEmail });
        if (user) { // if user is present then compare that those are same or not...
            if (user._id.toString() != _id) {
                this.throwError("201", "This email is already in use..");
            };
        };

    }


    async updateProfile() {
        const _id = this.ctx.params._id;
        const { value, error } = Validation.User.Auth.updateSchema.validate(this.ctx.request.body);
        if (error) {
            this.throwError("201", "Given Data is not valid..");
        };
        try {
            const updatedUser = await this.models.User.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        userName: value.userName,
                        userEmail: value.userEmail,
                        userPhoneNumber: value.userPhoneNumber
                    }
                },
                { new: true }
            );

            if (!updatedUser) {
                this.throwError("404", "User Not Found!");
            };
            const token = jwt.sign({ userEmail: value.userEmail }, this.config["jwt"]["secretKey"], {});
            this.ctx.cookies.set("userToken", token);
            console.log(token);
            this.ctx.body = {
                success: true,
                message: "Profile Updated",
                data: updatedUser,
                userToken: token
            };
        } catch (e) {
            console.log(e);
            this.throwError("301", "Error while Updating the profile...");
        }
    };
};

module.exports = UpdateProfile;
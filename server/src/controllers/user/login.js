const Base = require('../base.js');
const Validation = require('../../validations');
const jwt = require('jsonwebtoken');

class Login extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };


    async login() {

        const { value, error } = Validation.User.Auth.loginSchema.validate(this.ctx.request.body);
        if (error) {
            this.throwError("201", "Input Data is not validated");
        };

        // cheking whether input email is present or not...
        const user = await this.models.User.findOne({ userEmail: value.userEmail });
        if (user) {
            // checking the password..
            const isOkay = await user.verifyUserPassword(value.userPassword);
            if (isOkay) {
                // generating the token here..
                const token = jwt.sign({userEmail : value.userEmail} , this.config["jwt"]["secretKey"] , {});
                // setting the cookies here..
                this.ctx.cookies.set("userToken" , token);
                this.ctx.body = {
                    success: true,
                    message: "user login successfull",
                    data: {
                        user : user,
                        flag : (user.userEmail === this.config.admin.email) ? true : false
                    },
                    userToken : token
                };
            }else this.throwError("201" , "Password is wrong!");
        } else {
            this.throwError("201", "User not found");
        }
    };
};

module.exports = Login
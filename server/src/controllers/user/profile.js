const Base = require('../base.js');
const jwt = require('jsonwebtoken');

class Profile extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };


    async profile() {

        const { userToken } = this.ctx.request.body;
    
        if (userToken) {
            const data = jwt.verify(userToken, this.config.jwt.secretKey);
            if (data && data.userEmail) {
                const user = await this.models.User.findOne({ userEmail: data.userEmail });
                this.ctx.body = {
                    success: true,
                    message: "user get fetched from given cookies",
                    data: {
                        user: user,
                        flag: (user.userEmail === this.config.admin.email) ? true : false
                    },
                    userToken: userToken
                };
            } else {
                this.throwError("102", "Something unpredictable happened..");
            }
        } else {
            this.throwError("101", "No cookies found!");
        }

    };
};

module.exports = Profile;
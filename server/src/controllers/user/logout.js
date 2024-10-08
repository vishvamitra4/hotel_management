const Base = require('../base.js');

class Logout extends Base {
    constructor(ctx, next) {
        super(ctx, next);
    };

    async logout() {
        this.ctx.cookies.set("userToken" , "");
        this.ctx.body = {
            success : true,
            message : "Logout Successfull.."
        };
    };

};

module.exports = Logout;
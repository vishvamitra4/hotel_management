const Base = require('../base.js');
const jwt = require('jsonwebtoken');

class Profile extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "profile" : ["validateUser"]
        }
    };


    async profile() {

        const { userToken } = this.ctx.request.body;
    
        if (userToken) {
            const data = jwt.verify(userToken, this.config.jwt.secretKey);
            if (data && data.userEmail) {
                const user = await this.models.User.findById(data._id);
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
        };
    };

    // finding userDetail by its id..
    async profileById() {
        const _id = this.ctx.params._id;
        if(!_id){
            this.throwError("101" , "No id is present here..");
        };

        try{
            const user = await this.models.User.findOne({_id : _id});
            if(user){
                this.ctx.body = {
                    success : true,
                    message : "User got fetched!",
                    data : user
                };
            };
        }catch(e){
            this.throwError("404" , "User Not Found");
        }
    }


};

module.exports = Profile;
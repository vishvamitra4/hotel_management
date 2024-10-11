const Base = require('../base');
const Validation = require('../../validations');
const { default: mongoose } = require('mongoose');

class FetchUsers extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "fetchUsers": ["validateAdmin"],
            "toggleUserStatus": ["validateAdmin"]
        };
    };

    async fetchUsers() {
        try {
            const users = await this.models.User.find({ userEmail: { $ne: this.config.admin.email } });
            this.ctx.body = {
                success: true,
                message: "All Users Fetched!",
                data: users
            };
        } catch (e) {
            this.throwError("404", "Users Not Found");
        };
    };

    async toggleUserStatus() {
        const _id = this.ctx.params._id;
        try {
            const user = await this.models.User.findById(_id);
            if (!user) this.throwError("404", "User not Found");
            const newStatus = (user.userStatus === "active") ? "disable" : "active";
            const updatedUserWithStatus = await this.models.User.findByIdAndUpdate(
                _id,
                {
                    $set: {
                        userStatus: newStatus
                    }
                },
                { new: true }
            );
            this.ctx.body = {
                success: true,
                message: "User Status got Updated!",
                data: updatedUserWithStatus
            };
        } catch (e) {
            this.throwError("301", "Error while updating the status");
        }
    };
};


module.exports = FetchUsers;
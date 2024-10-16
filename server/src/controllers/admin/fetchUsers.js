const {CancelBooking} = require("../booking");

class FetchUsers extends CancelBooking { // extending cancleBooking properties..
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "fetchUsers": ["validateAdmin"],
            "toggleUserStatus": ["validateAdmin"]
        };
    };

    // fetchin user detail...
    async fetchUsers() {
        const { userName, userEmail } = this.ctx.query;
        let filter = { userEmail: { $ne: this.config.admin.email } };

        if (userName.length > 0) {
            filter.userName = { $regex: userName, $options: "i" } // it is case insensitive..
        };
        if (userEmail.length) {
            filter.userEmail = { $ne: this.config.admin.email, $regex: userEmail, $options: "i" }
        }
        try {
            const users = await this.models.User.find(filter);
            this.ctx.body = {
                success: true,
                message: "All Users Fetched!",
                data: users
            };
        } catch (e) {
            this.throwError("404", "Users Not Found");
        };
    };

    // toggle user Status...
    async toggleUserStatus() {
        const _id = this.ctx.params._id;

        const bookings = await this.models.Booking.find({bookingUser : _id , bookingStatus : {$eq : "confirmed"}});
        for(const B of bookings){ 
            const {_id} = B;
            await this.cancelBooking(_id); // cancelBooking method..
        }
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
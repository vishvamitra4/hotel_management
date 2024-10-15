const Base = require("../base");
const { default: mongoose } = require("mongoose");

class AddComment extends Base {
    constructor(ctx, next) {
        super(ctx, next);
        this._beforeMethod = {
            "addComment": ["validateUser"]
        };
    };


    async addComment() {

        const { hotelId, userId } = this.ctx.params;
        const { description } = this.ctx.request.body;

        if (!hotelId || !userId) {
            this.throwError("404", "Not Found..");
        };

        try {
            const newComment = new this.models.Comment({
                _id: new mongoose.Types.ObjectId(),
                hotelId: hotelId,
                userId: userId,
                description: description
            });
            await newComment.save();
            this.ctx.body = {
                success: true,
                message: "Comment Added!",
                data: newComment
            };
        } catch (e) {
            console.log(e);
            this.throwError("301", "Data Savinf Failed");
        };
    };


    async fetchComment() {
        const { hotelId } = this.ctx.params;
        if (!hotelId) {
            this.throwError("404", "Hotel Id Not Found..");
        };

        try {
            const comments = await this.models.Comment.find({ hotelId: hotelId }).populate({
                path: "userId",
                select: 'userName'
            }).sort({ created: -1 });
            this.ctx.body = {
                success: true,
                message: "all comments fetched",
                data: comments
            };
        } catch {
            this.throwError("201", "Commets Not Fetched!");
        }
    }
}

module.exports = AddComment;

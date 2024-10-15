const Router = require('@koa/router');
const controller = require('../controllers');

const r = new Router()

// posting comments..
r.post("/add/comment/:userId/:hotelId" , async(ctx , next)=>{
    const commentController = new controller.Comment.AddComment(ctx , next);
    await commentController.execute("addComment");
});

// fetching all comments...
r.get("/fetch/comment/:hotelId" , async(ctx , next)=>{
    const commentController = new controller.Comment.AddComment(ctx , next);
    await commentController.execute("fetchComment");
})

module.exports = r;
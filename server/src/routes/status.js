const Router = require('@koa/router');

const route = new Router();
route.get('/api/status' , (ctx)=>{
    ctx.body = {
        success : true,
        msg : "Server is working properly.."
    };
});

module.exports = route;
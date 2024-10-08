const Router = require('@koa/router');
const controllers = require('../controllers');
const r = new Router();


r.post('/register/user' , async(ctx , next)=>{
    const authController = new controllers.User.Register(ctx , next);
    await authController.execute("register");
});

r.post('/login/user' , async(ctx , next)=>{
    const authController = new controllers.User.Login(ctx , next);
    await authController.execute("login");
})

r.post('/profile' , async(ctx , next)=>{
    const authController = new controllers.User.Profile(ctx , next);
    await authController.execute("profile");
})

r.post("/logout", async(ctx , next)=>{
    const authController = new controllers.User.Logout(ctx , next);
    await authController.execute("logout");
})


module.exports = r;
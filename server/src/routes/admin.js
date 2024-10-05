const Router = require('@koa/router');
const controller = require('../controllers');

const r = new Router();

r.post("/new/hotel" , async(ctx , next)=>{
    const addHotelController = new controller.Admin.AddHotel(ctx , next);
    await addHotelController.execute("addHotel");
});


module.exports = r;
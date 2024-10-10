const Router = require("@koa/router");
const controller = require("../controllers");

const r = new Router();

r.get("/fetch/hotels" , async(ctx , next)=>{
    const HotelController = new controller.FetchHotels(ctx , next);
    await HotelController.execute("fetchHotels");
});

r.get("/fetch/hotels/:_id" , async(ctx , next)=>{
    const HotelController = new controller.FetchHotels(ctx , next);
    await HotelController.execute("fetchHotelsById");
})
module.exports = r;
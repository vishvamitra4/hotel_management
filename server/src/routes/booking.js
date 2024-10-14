const Router = require("@koa/router");
const controller = require('../controllers');

const r = new Router();

r.post("/book/hotel", async (ctx, next) => {
    const bookingController = new controller.Booking.BookHotel(ctx, next);
    await bookingController.execute("bookHotel");
});

r.post("/check/availability", async (ctx, next) => {
    const bookingController = new controller.Booking.CheckAvailability(ctx, next);
    await bookingController.execute("checkingRoomAvailability");
});

r.get("/fetch/booking/:_id" , async(ctx , next)=>{
    const bookingController = new controller.Booking.FetchBooking(ctx , next);
    await bookingController.execute("fetchBooking");
})

module.exports = r;
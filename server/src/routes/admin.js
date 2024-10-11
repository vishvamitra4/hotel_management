const Router = require('@koa/router');
const controller = require('../controllers');

const r = new Router();

r.post("/new/hotel" , async(ctx , next)=>{
    const addHotelController = new controller.Admin.AddHotel(ctx , next);
    await addHotelController.execute("addHotel");
});

r.put("/update/hotel/:_id" , async(ctx , next)=>{
    const updateHotelController = new controller.Admin.UpdateHotel(ctx , next);
    await updateHotelController.execute("updateHotel");
});

r.get("/fetch/users" , async(ctx , next)=>{
    const fetchController = new controller.Admin.FetchUsers(ctx , next);
    await fetchController.execute("fetchUsers");
});

r.put("/toggle/user/status/:_id" , async(ctx , next)=>{
    const fetchController = new controller.Admin.FetchUsers(ctx , next);
    await fetchController.execute("toggleUserStatus");
});


module.exports = r;
import { Routes, Route } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/user/login";
import Register from "../views/user/register";
import AdminProfile from "../views/admin/adminProfile";
import UserProfile from "../views/user/userProfile";


function AppRouter() {

    return (
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/register" element = {<Register />} />
            <Route path="/profile/admin" element = {<AdminProfile />} />
            <Route path="/profile/user" element = {<UserProfile />} />
            <Route path="/profile/admin/:subpage?" element = {<AdminProfile />} />
            <Route path="/profile/user/:subpage?" element = {<UserProfile />} />
        </Routes>
    )
};

export default AppRouter;
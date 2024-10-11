import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/user/login";
import Register from "../views/user/register";
import AdminProfile from "../views/admin/adminProfile";
import UserProfile from "../views/user/userProfile";
import HotelDetail from "../components/hotelDetail";
import ProtectedRoute from "./protectedRoutes/protectedRoute";
import HotelForm from "../components/hotelForm";
import UpdateUserForm from "../components/updateUserForm";
import AllUsers from "../components/allUsers";


function AppRouter() {

    const userToken = window.localStorage.getItem("userToken");


    return (
        <Routes>

            <Route path="/" element={<Home />} />
            {
                (!userToken || userToken.length === 0)
                &&
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>
            }

            {
                (userToken &&
                    <>
                        <Route path="/update/profile" element={<UpdateUserForm />} />
                    </>
                )
            }

            {/* Protected Routed for checking whether user or admin is there or not..*/}
            <Route element={<ProtectedRoute isAdmin={"true"} />}>
                <Route path="/profile/admin" element={<AdminProfile />} />
                <Route path="/profile/admin/:subpage?" element={<AdminProfile />} />
                <Route path="/hotel/:_id/update" element={<HotelForm />} />
            </Route>

            <Route element={<ProtectedRoute isAdmin={"false"} />}>
                <Route path="/profile/user" element={<UserProfile />} />
                <Route path="/profile/user/:subpage?" element={<UserProfile />} />
            </Route>

            <Route path="/hotel/:_id" element={<HotelDetail />} />

            <Route path="*" element={<Navigate to={"/"} />} />

        </Routes>
    )
};

export default AppRouter;
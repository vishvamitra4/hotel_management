import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import CheckOut from "../views/user/checkOut";
import Layout from "../layout";

function AppRouter() {
    const userToken = window.localStorage.getItem("userToken");
    const location = useLocation();
    console.log(location.search);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                {
                    (!userToken || userToken.length === 0) &&
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </>
                }

                {
                    (userToken && 
                        <>
                            <Route path="/update/profile" element={<UpdateUserForm />} />
                            <Route path="/hotel/:_hotelId/:_userId/checkout" element={<CheckOut />} />
                        </>
                    )
                }

                {/* Redirect to login for /admin paths if not authenticated */}
                <Route path="/admin/*" element={userToken ? <AdminProfile /> : <Navigate to="/login" />} />

                {/* Protected Route for Admin */}
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
            </Route>
        </Routes>
    );
};

export default AppRouter;

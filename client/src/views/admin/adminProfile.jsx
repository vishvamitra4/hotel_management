import React, { useContext, useState } from "react";
import HotelForm from "../../components/hotelForm";
import UserDetails from "../../components/userDetail";
import Navbar from "../../components/verticalNavbar";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/user/userContext";
import { BallTriangle } from 'react-loader-spinner';
import AllUsers from "../../components/allUsers";
import AllBooking from "../../components/allBooking";

function AdminProfile() {
    let { subpage } = useParams();
    if (subpage == undefined) {
        subpage = "userprofile";
    };

    const { user } = useContext(UserContext);

    if (!user) return (<BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
    />);

    return (
        <div className="flex">
            <Navbar />
            <div className="mx-[auto]">
                {subpage == "addhotel" && <HotelForm />}
                {subpage == "userprofile" && <UserDetails user={user} />}
                {subpage == "allusers" && <AllUsers />}
                {subpage == "allbooking" && <AllBooking />}
            </div>
        </div>
    )
};

export default AdminProfile;
import HotelForm from "../../components/hotelForm";
import Navbar from "../../components/verticalNavbar";
import { UserContext } from "../../contexts/user/userContext";
import React from "react";
import { useParams } from "react-router-dom";

function AdminProfile() {

    let {subpage} = useParams();

    console.log(subpage);
    if(subpage == undefined){
        subpage = "userprofile";
    };

    return (
        <div className="flex">

            <Navbar />
            {subpage === "addhotel" && <HotelForm />}
        </div>
    )
};

export default AdminProfile;
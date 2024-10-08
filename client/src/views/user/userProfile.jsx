import Navbar from "../../components/verticalNavbar";
import { UserContext } from "../../contexts/user/userContext";
import React from "react";

function UserProfile() {

    return (
        <div className="flex">

            <Navbar />
            {/* Content Area */}
            <div className="ml-64 flex-1 p-10">
                {/* Content goes here */}
                <h1 className="text-2xl font-bold">Welcome to the User Dashboard</h1>
                <p>Your main content will appear here.</p>
            </div>
        </div>
    )
};

export default UserProfile;
import React from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/user/userContext";

const Navbar = () => {

    const [flag, setFlag] = React.useState(false);
    const { user, setUser , isAdmin} = React.useContext(UserContext);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/logout");
            localStorage.setItem("userToken", "");
            setUser(null);
            alert("Logout Successfull!");
            setFlag(true);
        } catch (e) {
            alert(e.response.data.error.message);
        }
    };

    const temp = (isAdmin) ? "admin" : "user";

    if (flag) {
        return <Navigate to={"/"} />
    }

    return (

        <div className="bg-gray-800 w-64 h-screen space-y-6 py-7 px-2 fixed inset-y-0 left-0">
            {/* Name */}
            <div className="text-white text-lg font-semibold px-4"><Link to={"/"}>Hotel Name</Link></div>

            {/* Navigation Links */}
            <nav className="space-y-4">
                <Link
                    to={`/profile/${temp}/userprofile`}
                    className="block text-white px-4 py-2 hover:bg-gray-700 rounded"
                >
                    {user && user.userName}
                </Link>
                <Link
                    to={`/profile/${temp}/addhotel`}
                    className="block text-white px-4 py-2 hover:bg-gray-700 rounded"
                >
                    Add Hotel
                </Link>
                <Link
                    to= {`/profile/${temp}/allbooking`}
                    className="block text-white px-4 py-2 hover:bg-gray-700 rounded"
                >
                    All Bookings
                </Link>
                <button
                    className="block text-white px-4 py-2 hover:bg-red-600 rounded w-full text-left"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
        </div>

    );
};

export default Navbar;

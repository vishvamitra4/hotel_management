import React from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/user/userContext";

const Navbar = () => {

    const [flag, setFlag] = React.useState(false);
    const { user, setUser, isAdmin } = React.useContext(UserContext);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/logout");
            localStorage.clear();
            setUser(null);
            alert("Logout Successful!");
            setFlag(true);
        } catch (e) {
            alert(e.response.data.error.message);
        }
    };

    const temp = isAdmin ? "admin" : "user";

    if (flag) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="bg-[#0B192C] w-64  h-screen space-y-6 py-7 px-2 fixed inset-y-0 left-0">
            {/* Name */}
            <div className="text-[#FF6500] text-lg font-semibold px-4">
                <Link to={"/"}>AirBNB</Link>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4">
                <Link
                    to={`/profile/${temp}/userprofile`}
                    className="block text-white px-4 py-2 hover:bg-[#1E3E62] rounded"
                >
                    {user && user.userName}
                </Link>
                {isAdmin && (
                    <>
                        <Link
                            to={`/profile/admin/addhotel`}
                            className="block text-white px-4 py-2 hover:bg-[#1E3E62] rounded"
                        >
                            Add Hotel
                        </Link>
                        <Link
                            to={`/profile/admin/allusers`}
                            className="block text-white px-4 py-2 hover:bg-[#1E3E62] rounded"
                        >
                            All Users
                        </Link>
                    </>
                )}
                <Link
                    to={`/profile/${temp}/allbooking`}
                    className="block text-white px-4 py-2 hover:bg-[#1E3E62] rounded"
                >
                    All Bookings
                </Link>
                <button
                    className="block text-white px-4 py-2 hover:bg-[#FF6500] rounded w-full text-left"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Navbar;

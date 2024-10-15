import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/user/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
    const { setUser , setIsAdmin } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = localStorage.getItem("isAdmin");

    const [flag , setFlag] = React.useState(false);

    const handleLogout = async (e) => {
        try {
            await axios.post("/logout");
            localStorage.clear();
            setUser(null);
            setIsAdmin(null);
            toast.success("Logout Successful!");
            setFlag(true);
        } catch (e) {
            toast.error(e.response.data.error.message);
        }
    };

    if(flag){
        return <Navigate to={"/"} />
    }

    return (
        <nav className="bg-[#0B192C] text-white pr-[5rem] pl-[5rem] p-[2rem] shadow-lg">
            <ul className="flex justify-between items-center">
                {/* Left side: Home */}
                <li>
                    <Link
                        to="/"
                        className="text-[#FF6500] hover:text-[#FF6500] text-[1.4rem] font-bold transition duration-300"
                    >
                        Home
                    </Link>
                </li>

                {/* Right side: User and Authentication Links */}
                <div className="flex space-x-6">
                    {
                        user && (
                            <>
                                <li>
                                    <Link
                                        to={`${isAdmin=='true' ? "/profile/admin" : "/profile/user"}`}
                                        className="text-[#fff] hover:text-[#FF6500] text-[1.4rem] font-bold transition duration-300"
                                    >
                                        {user ? `${user.userName}'Profile` : null}
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        onClick={handleLogout}
                                        className="text-[#e74c3c] hover:text-[#FF6500] text-[1.4rem] font-bold transition duration-300"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )
                    }
                    {
                        user==null && (
                            <>
                                <li>
                                    <Link
                                        to="/register"
                                        className="text-[#fff] hover:text-[#FF6500] text-[1.4rem] font-bold transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-[#fff] hover:text-[#FF6500] text-[1.4rem] font-bold transition duration-300"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;

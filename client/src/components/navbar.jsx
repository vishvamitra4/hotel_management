import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/user/userContext';

const Navbar = () => {
    const { user, isAdmin } = useContext(UserContext);

    return (
        <nav className={`flex justify-center items-center ${isAdmin ? "bg-red-800" : "bg-[#ff385c]"} p-4 h-[500px] bg-cover bg-center`}
            style={{ backgroundImage: 'url("https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800")' }}>
            <div className="w-full max-w-7xl flex justify-between items-center">
                {/* Hotel Name */}
                <div className="text-white text-4xl font-extrabold">
                    <Link to={"/"}><h1 className='text-[200px]'><span className='text-[300px]'>AIR</span><span className='text-[#ff385c]'>BNB</span></h1></Link>
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link
                            to={`${isAdmin ? "/profile/admin" : "/profile/user"}`}
                            className="text-[60px] font-fantasy text-white px-4 py-2 hover:text-[#ff385c] transition duration-300 ease-in-out"
                        >
                            {user ? user.userName : null}
                        </Link>
                    </li>
                    {
                        !user &&
                        (
                            <>
                                <li>
                                    <Link
                                        to="/register"
                                        className="text-[60px] font-fantasy text-white px-4 py-2 hover:text-[#ff385c] transition duration-300 ease-in-out"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-[60px] font-fantasy text-white px-4 py-2 hover:text-[#ff385c] transition duration-300 ease-in-out"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

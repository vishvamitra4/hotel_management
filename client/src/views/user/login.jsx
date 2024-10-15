import React, { useState, useContext } from 'react';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../contexts/user/userContext';
import { toast } from 'react-toastify';
import Footer from "../../components/footer"

const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [flag, setFlag] = useState(false);
    const [flag1, setFlag1] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { setUser, setIsAdmin } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail || !userPassword) {
            setErrorMessage('Both fields are required.');
            return;
        }
        if (!validateEmail(userEmail)) {
            setErrorMessage('Please enter a valid email.');
            return;
        }
        if (userPassword.length < 4) {
            setErrorMessage('Password must be at least 3 characters long.');
            return;
        }

        try {
            const { data } = await axios.post("/login/user", { userEmail, userPassword });

            setUser(data.data.user);
            setIsAdmin(data.data.flag);

            localStorage.setItem("userToken", data.userToken);
            localStorage.setItem("isAdmin", data.data.flag);
            localStorage.setItem("user", JSON.stringify(data.data.user));

            toast.success(data.message);
            setErrorMessage("");
            setFlag1(true);
            const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
            console.log(redirectPath);
            navigate(redirectPath);

        } catch (e) {
            console.log(e);
            setUser(null);
            localStorage.clear();
            setIsAdmin(null);
            toast.error(e.response.data.error.message);
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    if (flag) {
        return <Navigate to="/register" />
    };

    if (flag1) {
        return <Navigate to={"/"} />
    }

    return (
        <>
            <div className="mx-auto mt-5 mb-[300px] p-6 bg-[#0B192C] w-[30%] rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-[#FF6500]">Login</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#FF6500]">Email</label>
                        <input
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-[#FF6500]">Password</label>
                        <input
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FF6500] text-white p-2 rounded-md hover:bg-[#1E3E62] transition"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{' '}
                        <button
                            onClick={() => setFlag(true)}
                            className="text-[#FF6500] hover:underline"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;

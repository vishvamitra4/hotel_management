import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Footer from '../../components/footer';
import image1 from "../../assets/image1.png";

const Register = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [flag, setFlag] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userName || !userEmail || !userPassword || !userPhoneNumber) {
            setErrorMessage('All fields are required.');
            return;
        }
        if (!validateEmail(userEmail)) {
            setErrorMessage('Invalid email format.');
            return;
        }
        if (userPassword.length < 4) {
            setErrorMessage('Password must be at least 4 characters long.');
            return;
        }

        try {
            const { data } = await axios.post("/register/user", {
                userName, userEmail, userPassword, userPhoneNumber
            });
            alert(`${data.message}. You can now log in.`);
            setFlag(true);
        } catch (e) {
            alert(e.response.data.error.message);
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    if (flag) {
        return <Navigate to="/login" />;
    }

    return (
        <div style={{ backgroundImage: `url(${image1}`, backgroundSize: 'cover' }} className='flex flex-col justify-between w-[100%] min-h-screen'>


            <div className="container mx-auto mt-12 max-w-lg">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6">Create an Account</h2>

                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your username"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={userPhoneNumber}
                                onChange={(e) => setUserPhoneNumber(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#ff385c] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                onClick={() => setFlag(true)}
                                className="text-indigo-600 hover:underline"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Register;

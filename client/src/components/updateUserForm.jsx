import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../contexts/user/userContext";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from "./footer";
const UpdateUserForm = () => {
    const { user, setUser, isAdmin } = useContext(UserContext);
    const [flag, setFlag] = useState(false);
    if (!user) {
        return <h1>Loading...</h1>
    };
    const [formData, setFormData] = useState({
        userName: user?.userName || '',
        userEmail: user?.userEmail || '',
        userPhoneNumber: user?.userPhoneNumber || ''
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updateDetail = async () => {
            try {

                const { data } = await axios.put(`/update/profile/${user._id}`, formData);
                localStorage.setItem("userToken", data.userToken);
                setUser(data.data);
                toast.success(data.message);
                setFlag(true);
            } catch (e) {
                toast.error(e.response.data.error.message);
            };
        };
        updateDetail();
    };

    if (flag) {
        return <Navigate to={`/profile/${isAdmin ? "admin" : "user"}`} />;
    }

    return (
        <div>
            <div className="max-w-md mx-auto mt-10 mb-[200px] bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Your Profile</h2>

                <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="userName">Name:</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="userEmail">Email:</label>
                        <input
                            id="userEmail"
                            name="userEmail"
                            type="email"
                            value={formData.userEmail}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="userPhoneNumber">Phone Number:</label>
                        <input
                            id="userPhoneNumber"
                            name="userPhoneNumber"
                            type="text"
                            value={formData.userPhoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UpdateUserForm;

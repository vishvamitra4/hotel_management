import React from 'react';
import { Link } from "react-router-dom";

const UserDetails = ({ user }) => {

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Your Profile</h2>

            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">Name:</p>
                <p className="text-gray-600">{user?.userName}</p>
            </div>

            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">Email:</p>
                <p className="text-gray-600">{user?.userEmail}</p>
            </div>

            <div className="mb-6">
                <p className="text-lg font-semibold text-gray-700">Phone Number:</p>
                <p className="text-gray-600">{user?.userPhoneNumber}</p>
            </div>
            <Link to={`/update/profile`}>
                <button
                    className="w-full py-3 bg-[#FF6500] text-white font-semibold rounded-lg hover:bg-[#e55d00] transition duration-300"
                >
                    Edit Profile
                </button>
            </Link>
        </div>
    );
};

export default UserDetails;

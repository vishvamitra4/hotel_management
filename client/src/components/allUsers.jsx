import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserTable = () => {
    // Initial data
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const fetchUsers = async () => {
        try {
            const query = new URLSearchParams({ userName, userEmail }).toString();
            const { data } = await axios.get(`/fetch/users?${query}`);
            setUsers(data.data);
        } catch (e) {
            console.log(e.response.data.error.message);
        }
    };

    useEffect(() => {
        fetchUsers(); // Fetch all users initially
    }, []);

    const handleSearch = () => {
        fetchUsers(); // Fetch filtered users based on inputs
    };

    const toggleStatus = async (_id) => {
        try {
            const { data } = await axios.put(`/toggle/user/status/${_id}`);
            alert(data.message);
            fetchUsers(); // Reload users after status change without reloading the page
        } catch (e) {
            alert(e.response.data.error.message);
        }
    };

    const allUsers = users.map((user) => (
        <tr key={user._id} className={`text-center ${user.userStatus === "disable" ? "bg-[#FF650020]" : "bg-[#0b192ca1]"} border-t border-[#1E3E62]`}>
            <td className="px-4 py-2 text-black">{user.userName}</td>
            <td className="px-4 py-2 text-black">{user.userEmail}</td>
            <td className="px-4 py-2 text-black">{user.userPhoneNumber}</td>
            <td className={`px-4 py-2 ${user.userStatus === 'active' ? 'text-[#00FF00]' : 'text-[#FF0000]'}`}>
                {user.userStatus}
            </td>
            <td className="px-4 py-2 text-black">{new Date(user.created).toLocaleString()}</td>
            <td className="px-4 py-2 text-black">{new Date(user.modified).toLocaleString()}</td>
            <td className="px-4 py-2">
                <button
                    className="px-4 py-2 bg-[#FF6500] text-white rounded hover:bg-[#FF6500D0] transition duration-200"
                    onClick={() => toggleStatus(user._id)}
                >
                    Toggle Status
                </button>
            </td>
        </tr>
    ));

    if (!users) {
        return <h1 className="text-center mt-10">Loading...</h1>;
    }

    return (
        <div className="flex flex-col justify-center mt-10">
            {/* Search fields */}
            <div className="mb-4 flex justify-center space-x-4">
                <input
                    type="text"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    placeholder="Filter by User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="email"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    placeholder="Filter by Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-[#FF6500] text-white rounded-md hover:bg-[#FF6500D0] transition duration-200"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="flex justify-center">
                <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-[#1E3E62]">
                        <tr>
                            <th className="px-4 py-2 text-white">User Name</th>
                            <th className="px-4 py-2 text-white">Email</th>
                            <th className="px-4 py-2 text-white">Phone Number</th>
                            <th className="px-4 py-2 text-white">Status</th>
                            <th className="px-4 py-2 text-white">Created</th>
                            <th className="px-4 py-2 text-white">Modified</th>
                            <th className="px-4 py-2 text-white">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;

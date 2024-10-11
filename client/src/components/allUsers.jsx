import axios from 'axios';
import React, { useState, useEffect } from 'react';

const UserTable = () => {
    // Initial data
    const [users, setUsers] = useState([]);

    if (!users) {
        return <h1>Loading..</h1>;
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get("/fetch/users");
                setUsers(data.data);
            } catch (e) {
                console.log(e.response.data.error.message);
            }
        };
        fetchUsers();
    }, []);

    const toggleStatus = async (_id) => {
        try {
            const { data } = await axios.put(`/toggle/user/status/${_id}`);
            alert(data.message);
            // reloading the page..
            location.reload();
        } catch (e) {
            alert(e.response.data.error.message);
        }
    };

    const allUsers = users.map((user) => {
        return (
            <tbody key={user._id}>
                <tr className={`text-center ${user.userStatus === "disable" ? "bg-[#FF650020]" : "bg-[#0b192ca1]"} border-t border-[#1E3E62] mt-2 rounded-lg shadow-md`}>
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
                            className="px-4 py-2 bg-[#FF6500] text-white rounded hover:bg-[#FF6500D0]"
                            onClick={() => toggleStatus(user._id)}
                        >
                            Toggle Status
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    });


    return (
        <div className="flex justify-center mt-10">
            <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
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
                {allUsers}
            </table>
        </div>
    );
};

export default UserTable;

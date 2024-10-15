import React, { useState, useEffect } from 'react';
import axios from "axios";
import { FaUser } from "react-icons/fa";
import {toast} from 'react-toastify';

function Comment() {
    const [comment, setComment] = useState("");
    const hotel = JSON.parse(localStorage.getItem("hotel"));
    const user = JSON.parse(localStorage.getItem("user"));

    const [comments, setComments] = useState([]);

    const addComment = async () => {
        try {
            const { data } = await axios.post(`/add/comment/${user._id}/${hotel._id}`, { description: comment });
            toast.success(data.message);
            location.reload();
        } catch (e) {
            toast.error(e.response.data.error.message);
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axios.get(`/fetch/comment/${hotel._id}`);
                setComments(data.data);
            } catch (e) {
                toast.error(e.response.data.error.message);
            }
        };
        fetchComments();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            addComment();
            setComment("");
        } else {
            toast.error("Please enter a comment.");
        }
    };

    const allComments = comments.map((item) => (
        <div key={item._id} className="border-b border-gray-300 py-3">
            <div className="flex items-center space-x-3">
                <FaUser />
                <div>
                    <h2 className="text-[#FF6500] font-semibold">{item.userId.userName}</h2>
                    <p className="text-gray-500 text-sm">{item.created}</p>
                </div>
            </div>
            <p className="mt-2 text-gray-800">{item.description}</p>
        </div>
    ));

    return (
        <div className="w-[100%] mx-auto mt-10 p-5 bg-white text-black  rounded-md">
            <h1 className="text-xl font-semibold mb-4 text-[#FF6500]">Comments</h1>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment"
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E3E62] bg-gray-100 text-black"
                    rows="4"
                />

                <button
                    type="submit"
                    className="bg-[#FF6500] w-[20%] text-white py-2 rounded-md hover:bg-[#1E3E62] focus:outline-none focus:ring-2 focus:ring-[#1E3E62]"
                >
                    Submit
                </button>
            </form>

            <div className="mt-6 space-y-4">
                {allComments}
            </div>
        </div>
    );
}

export default Comment;

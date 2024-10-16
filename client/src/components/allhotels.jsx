import React, { useState, useEffect } from 'react';
import Filter from './Filter/filter';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AllHotel() {
    const [hotels, setHotels] = useState([]);

    
    const fetchHotels = async (filters = {}) => {
        try {
            const { search, sortBy, value } = filters;
            const query = {};

            if (search) query.search = search;
            if (sortBy && value) query[sortBy] = value;

            const queryString = new URLSearchParams(query).toString();

            const { data } = await axios.get(`/fetch/hotels?${queryString}`);
            setHotels(data.data);
        } catch (e) {
            alert(e.response.data.error.message);
        }
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    

    return (
        <div className="flex flex-col items-center mt-10 w-[130%]">
            <Filter onFilter={fetchHotels} />
            <br />
            <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-[#1E3E62] text-white">
                        <tr>
                            <th className="px-4 py-2">Hotel Name</th>
                            <th className="px-4 py-2">State</th>
                            <th className="px-4 py-2">City</th>
                            <th className="px-4 py-2">Owner</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel._id} className="text-center border-t border-[#1E3E62]">
                                <td className="px-4 py-2 text-black">{hotel.hotelName}</td>
                                <td className="px-4 py-2 text-black">{hotel.hotelState}</td>
                                <td className="px-4 py-2 text-black">{hotel.hotelCity}</td>
                                <td className="px-4 py-2 text-black">{hotel.hotelOwnerName}</td>
                                <td className="px-4 py-2">
                                    <Link to={`/hotel/${hotel._id}/update`}>
                                        <button
                                            className="px-4 py-2 bg-[#FF6500] text-white rounded hover:bg-[#FF6500D0] transition duration-200"
                                        >
                                            Update
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllHotel;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
    const { _id, hotelName, hotelRating, hotelTags, hotelImages, hotelCity, hotelState, hotelRoomsDetail , hotelZipcode } = hotel;
    const [currentImage, setCurrentImage] = useState(0);

    // Calculate the average room cost
    const calculateAverageCost = (rooms) => {
        const totalCost = rooms.reduce((acc, room) => acc + room.pricePerDay, 0);
        return (totalCost / rooms.length).toFixed(2);
    };

    const averageCost = calculateAverageCost(hotelRoomsDetail);

    const handleNextImage = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % hotelImages.length);
    };

    const handlePrevImage = () => {
        setCurrentImage((prevIndex) => (prevIndex - 1 + hotelImages.length) % hotelImages.length);
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-md bg-white p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            {/* Carousel */}
            <div className="relative">
                <img
                    src={hotelImages[currentImage]}
                    alt={hotelName}
                    className="w-full h-48 object-cover rounded-t-md"
                />
                <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#1e3e62] text-white p-2 rounded-full hover:bg-[#ff6500] transition"
                >
                    ◀
                </button>
                <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1e3e62] text-white p-2 rounded-full hover:bg-[#ff6500] transition"
                >
                    ▶
                </button>
            </div>
            <Link to={`/hotel/${_id}`}>
                <div className="px-6 py-4">
                    <div className="font-bold text-lg mb-2 text-[#ff6500]">{hotelName}</div>
                    <p className="text-[#1e3e62] text-base">
                        {hotelCity}, {hotelState} , {hotelZipcode}
                    </p>
                    <p className="text-yellow-500 font-bold">⭐ {hotelRating}</p>
                    <p className="text-[#0b192c] font-bold mt-2">Average Room Price: ₹{averageCost}</p>
                </div>

                <div className="px-6 pt-4 pb-2">
                    {hotelTags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-[#1e3e62] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </Link>
        </div>
    );
};

export default HotelCard;

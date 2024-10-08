import React, { useState } from 'react';

function HotelCard({ hotel }) {
    const { hotelName, hotelRating, hotelTags, hotelImages, hotelCity, hotelState, hotelRoomsDetail } = hotel;
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
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                >
                    ◀
                </button>
                <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                >
                    ▶
                </button>
            </div>

            <div className="px-6 py-4">
                <div className="font-bold text-lg mb-2">{hotelName}</div>
                <p className="text-gray-600 text-base">
                    {hotelCity}, {hotelState}
                </p>
                <p className="text-yellow-500 font-bold">⭐ {hotelRating}</p>
                <p className="text-gray-900 font-bold mt-2">Average Room Price: ${averageCost}</p>
            </div>

            <div className="px-6 pt-4 pb-2">
                {hotelTags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2 mb-2"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
};


export default HotelCard;

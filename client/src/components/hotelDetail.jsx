import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user/userContext";

const HotelDetail = () => {
    const { _id } = useParams();
    const [hotel, setHotel] = useState(null);
    const { isAdmin } = useContext(UserContext);
    const [bookingDetails, setBookingDetails] = useState({
        selectedRoomType: "",
        numRooms: 0,
        checkIn: "",
        checkOut: "",
        totalCost: 0,
    });

    useEffect(() => {
        async function fetchHotelDetail() {
            try {
                const { data } = await axios.get(`/fetch/hotels/${_id}`);
                if (data) {
                    setHotel(data.data);
                    // Initialize booking details with the first room type
                    setBookingDetails(prevDetails => ({
                        ...prevDetails,
                        selectedRoomType: data.data.hotelRoomTypes[0],
                    }));
                }
            } catch (e) {
                console.log(e.response?.data?.error?.message || e.message);
            }
        }
        fetchHotelDetail();
    }, [_id]);

    // Update booking details when room type changes
    useEffect(() => {
        if (hotel) {
            const room = hotel.hotelRoomsDetail.find(
                (room) => room.roomType === bookingDetails.selectedRoomType
            );
            if (room) {
                setBookingDetails((prevDetails) => ({
                    ...prevDetails,
                    numRooms: 0, // Default number of rooms...
                    checkIn: "",
                    checkOut: "",
                    totalCost: 0, // default cost..
                }));
            }
        }
    }, [bookingDetails.selectedRoomType, hotel]);

    const handleBookingChange = (field, value) => {
        setBookingDetails((prevDetails) => {
            const updatedDetails = { ...prevDetails, [field]: value };
            if (updatedDetails.numRooms && updatedDetails.checkIn && updatedDetails.checkOut) {
                const days =
                    (new Date(updatedDetails.checkOut) -
                        new Date(updatedDetails.checkIn)) /
                    (1000 * 3600 * 24);
                updatedDetails.totalCost =
                    days *
                    hotel.hotelRoomsDetail.find(
                        (room) => room.roomType === updatedDetails.selectedRoomType
                    ).pricePerDay *
                    updatedDetails.numRooms;
            } else {
                updatedDetails.totalCost = 0;
            }
            return updatedDetails;
        });
    };

    if (!hotel) {
        return <div>Loading...</div>;
    }

    const grandTotal = bookingDetails.totalCost;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    {/* Hotel Information */}
                    <div className="bg-[#0B192C] shadow-lg rounded-lg p-6 flex flex-col justify-between text-white mb-6">
                        <div>
                            <div className="text-3xl font-extrabold mb-2">
                                {hotel.hotelName}
                            </div>

                            {/* Hotel Star Emoji */}
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex items-center space-x-1">
                                    {Array(hotel.hotelStar)
                                        .fill("⭐")
                                        .map((star, index) => (
                                            <span key={index} className="text-yellow-400 text-2xl">{star}</span>
                                        ))}
                                </div>
                            </div>

                            {/* Hotel Rating with Images */}
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex items-center space-x-1">
                                    {Array(Math.floor(hotel.hotelRating))
                                        .fill("★")
                                        .map((star, index) => (
                                            <span key={index} className="text-yellow-400 text-xl">{star}</span>
                                        ))}
                                    {hotel.hotelRating % 1 !== 0 && (
                                        <span className="text-yellow-400 text-xl">☆</span> // half star
                                    )}
                                </div>
                                <span className="text-[#FF6500] font-semibold">({hotel.hotelRating} Rating)</span>
                            </div>

                            {/* Hotel Description */}
                            <p className="text-sm leading-relaxed mb-4">
                                {hotel.hotelDescription}
                            </p>

                            {/* Tags with Larger Cards */}
                            <div className="flex space-x-2 mt-2">
                                {hotel.hotelTags.map((tag, index) => (
                                    <div
                                        key={index}
                                        className="bg-[#FF6500] text-white py-3 px-4 rounded-lg text-lg font-semibold shadow-md hover:bg-[#D85000] transition ease-in-out duration-300"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Hotel Images Grid */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 mb-4">
                            {/* Full-width Image */}
                            <div className="relative overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={hotel.hotelImages[0]}  // Assuming the first image is the horizontal one
                                    alt="Hotel Image 1"
                                    className="w-full h-[400px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {/* Remaining Images in Grid */}
                            {hotel.hotelImages.slice(1).map((image, index) => (
                                <div key={index + 1} className="relative overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={image}
                                        alt={`Hotel Image ${index + 2}`}  // Adjusted for indexing
                                        className="w-full h-[300px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Booking Section */}
                <div className="lg:w-1/3">
                    <div className="bg-[#1E3E62] shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-center text-[#FF6500]">Book Your Stay</h2>

                        {/* Room Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-[#CCCCCC] mb-1">Room Type</label>
                            <select
                                value={bookingDetails.selectedRoomType}
                                onChange={(e) =>
                                    handleBookingChange("selectedRoomType", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                            >
                                {hotel.hotelRoomTypes.map((roomType, index) => (
                                    <option key={index} value={roomType}>
                                        {roomType}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Booking Details */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold text-white">Total Rooms</span>
                                <span className="text-lg font-bold text-[#FF6500]">
                                    {hotel.hotelRoomsDetail.find(
                                        (room) => room.roomType === bookingDetails.selectedRoomType
                                    ).totalRooms}
                                </span>
                            </div>
                            <label className="block text-sm font-medium text-[#CCCCCC] mb-1">No. of Rooms</label>
                            <input
                                type="number"
                                value={bookingDetails.numRooms}
                                onChange={(e) =>
                                    handleBookingChange("numRooms", e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                                min={0}
                                max={hotel.hotelRoomsDetail.find(
                                    (room) => room.roomType === bookingDetails.selectedRoomType
                                ).totalRooms}
                            />
                        </div>

                        {/* Check-in and Check-out Date */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm font-medium text-[#CCCCCC] mb-1">Check-in Date</label>
                                <input
                                    type="date"
                                    value={bookingDetails.checkIn}
                                    onChange={(e) =>
                                        handleBookingChange("checkIn", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                                />
                            </div>

                            <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm font-medium text-[#CCCCCC] mb-1">Check-out Date</label>
                                <input
                                    type="date"
                                    value={bookingDetails.checkOut}
                                    onChange={(e) =>
                                        handleBookingChange("checkOut", e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                                />
                            </div>
                        </div>

                        {/* Total Cost */}
                        {bookingDetails.totalCost > 0 && (
                            <div className="mt-4 text-green-400 font-semibold">
                                Total Cost for {bookingDetails.selectedRoomType}: ${bookingDetails.totalCost}
                            </div>
                        )}

                        {/* Grand Total and Book Now Button */}
                        <div className="mt-8 text-center">
                            <div className="text-2xl font-bold mb-4 text-white">
                                Grand Total: ${grandTotal > 0 ? grandTotal : 0}
                            </div>
                            <button
                                disabled={grandTotal === 0}
                                className={`w-full bg-[#FF6500] text-white py-3 rounded-lg shadow-md font-semibold transition-colors ${grandTotal === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D85000]"}`}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>

                    {/*This is for update button we have..*/}
                    {
                        (isAdmin == true) &&
                        <Link to={`/hotel/${_id}/update`}>
                        <button
                            className={`w-full bg-[#123c07] mt-5 text-white py-3 rounded-lg shadow-md font-semibold transition-colors`}
                        >
                            Update Hotel Detail
                        </button>
                        </Link>
                    }

                </div>
            </div>
        </div>
    );
};

export default HotelDetail;

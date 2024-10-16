import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate, redirect, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/user/userContext";
import { BookingDataContext } from "../contexts/booking/bookingDataContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HotelInformation from "./hotelInformation";
import Comment from "./comment";
import Footer from "./footer";

const HotelDetail = () => {
    const { _id } = useParams();
    const [hotel, setHotel] = useState(null);
    const { isAdmin, user } = useContext(UserContext);
    const { setBookingData, setGrandTotal } = useContext(BookingDataContext);
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState([]);

    useEffect(() => {
        async function fetchHotelDetail() {
            try {
                const { data } = await axios.get(`/fetch/hotels/${_id}`);
                if (data) {
                    setHotel(data.data);
                    localStorage.setItem("hotel", JSON.stringify(data.data));
                    const initialBookingDetails = data.data.hotelRoomTypes.map(roomType => ({
                        selectedRoomType: roomType,
                        numRooms: 0,
                        checkIn: "",
                        checkOut: "",
                        totalCost: 0,
                        available: ""
                    }));
                    setBookingDetails(initialBookingDetails);
                }
            } catch (e) {
                console.log(e.response?.data?.error?.message || e.message);
            }
        }
        fetchHotelDetail();
    }, [_id]);

    const handleBookingChange = (index, field, value) => {
        setBookingDetails(prevDetails => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index] = { ...updatedDetails[index], [field]: value };

            const checkInDate = new Date(updatedDetails[index].checkIn);
            const checkOutDate = new Date(updatedDetails[index].checkOut);

            if (field === 'checkOut' && checkOutDate <= checkInDate) {
                toast.error("Checkout date must be after the check-in date!");
                updatedDetails[index].checkOut = ""; // Clear the invalid checkout date
            }

            const currentRoomDetails = hotel.hotelRoomsDetail.find(
                (room) => room.roomType === updatedDetails[index].selectedRoomType
            );

            // Calculate total cost if everything is valid
            if (updatedDetails[index].numRooms && updatedDetails[index].checkIn && updatedDetails[index].checkOut && updatedDetails[index].available === "Available") {
                const days = (checkOutDate - checkInDate) / (1000 * 3600 * 24);
                updatedDetails[index].totalCost = days * currentRoomDetails.pricePerDay * updatedDetails[index].numRooms;
            } else {
                updatedDetails[index].totalCost = 0;
            }

            return updatedDetails;
        });
    };

    const handleAvailability = async (index, roomDetails) => {
        try {
            const { data } = await axios.post("/check/availability", {
                checkIn: roomDetails.checkIn,
                checkOut: roomDetails.checkOut,
                roomType: roomDetails.selectedRoomType,
                hotelId: _id,
                numRooms: roomDetails.numRooms
            });
            if (data) {
                handleBookingChange(index, "available", "Available");
                toast.success("Available");
            }
        } catch (e) {
            handleBookingChange(index, "available", "Not Available");
            toast.error("Rooms not available for the selected dates.");
        }
    };

    const handleBookNow = () => {
        const bookings = bookingDetails.filter((item) => item.numRooms > 0 && item.available === "Available");
        setBookingData(bookings);
        setGrandTotal(grandTotal);
        if (!user) {
            navigate(`/login?redirect=/hotel/${_id}`);
        } else {
            navigate(`/hotel/${_id}/${user._id}/checkout`);
        }

    };

    if (!hotel) {
        return <div>Loading...</div>;
    }

    const grandTotal = bookingDetails.reduce((sum, booking) => sum + booking.totalCost, 0);

    return (
        <>
            <div className="container mx-auto p-4">
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <div className="flex flex-col lg:flex-row gap-6">
                    <HotelInformation hotel={hotel} />
                    {/* Right Column: Booking Section */}
                    <div className="lg:w-[40%]">
                        <div className="bg-[#1E3E62] shadow-lg rounded-lg p-6">
                            <h2 className="text-2xl font-bold mb-6 text-center text-[#FF6500]">Book Your Stay</h2>

                            {hotel.hotelRoomTypes.map((roomType, index) => {
                                const roomDetails = bookingDetails[index];
                                const hotelRoomDetails = hotel.hotelRoomsDetail.find(room => room.roomType === roomType);

                                return (
                                    <div key={index} className="mb-6">
                                        <h3 className="text-xl font-semibold text-white mb-2">{roomType}</h3>
                                        <label className="block text-sm font-medium text-[#CCCCCC] mb-1">No. of Rooms</label>
                                        <input
                                            type="number"
                                            value={roomDetails.numRooms}
                                            onChange={(e) =>
                                                handleBookingChange(index, "numRooms", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                                            min={0}
                                            max={hotelRoomDetails.totalRooms}
                                        />

                                        <div className="flex gap-4 mb-6 mt-2">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-[#CCCCCC] mb-1">Check-in Date</label>
                                                <input
                                                    type="date"
                                                    value={roomDetails.checkIn}
                                                    onChange={(e) =>
                                                        handleBookingChange(index, "checkIn", e.target.value)
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-[#CCCCCC] mb-1">Check-out Date</label>
                                                <input
                                                    type="date"
                                                    value={roomDetails.checkOut}
                                                    onChange={(e) =>
                                                        handleBookingChange(index, "checkOut", e.target.value)
                                                    }
                                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#FF6500]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            {roomDetails.checkOut && roomDetails.checkIn && (
                                                <>
                                                    <div>
                                                        <h1 className={roomDetails.available === "Not Available" ? "text-red-500" : "text-green-500"}>
                                                            {roomDetails.available}
                                                        </h1>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAvailability(index, roomDetails)}
                                                        className="w-[30%] bg-[#0a192c] text-white py-2 rounded-lg shadow-md font-semibold transition-colors hover:bg-[#D85000] mb-4"
                                                    >
                                                        Check Availability
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {roomDetails.totalCost > 0 && (
                                            <div className="mt-4 text-green-400 font-semibold">
                                                Total Cost for {roomType}: ₹{roomDetails.totalCost}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="mt-8 text-center">
                                <div className="text-2xl font-bold mb-4 text-white">
                                    Grand Total: ₹{grandTotal > 0 ? grandTotal : 0}
                                </div>
                                <button
                                    onClick={handleBookNow}
                                    disabled={grandTotal === 0}
                                    className={`w-full bg-[#FF6500] text-white py-3 rounded-lg shadow-md font-semibold transition-colors ${grandTotal === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D85000]"}`}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>


                        {/* Room Types and Details */}
                        <div className="bg-[#0a192ce3] mt-5 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-[#ffffff] mb-4">Room Types</h2>
                            {hotel.hotelRoomsDetail.map((room, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-xl font-semibold text-[#ff6500] mb-2">{room.roomType}</h3>
                                    <p className="text-md text-[#ffffff]">Details: {room.roomDetail}</p>
                                    <p className="text-md text-[#ffffff]">Price per day: ₹{room.pricePerDay}</p>
                                    <p className="text-md text-[#ffffff]">Total rooms: {room.totalRooms}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <br />
                <Comment />
            </div>
            <Footer />
        </>
    );
};

export default HotelDetail;
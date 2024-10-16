import React, { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { BookingDataContext } from "../../contexts/booking/bookingDataContext";
import { FaBed, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'

function CheckOut() {
    const { bookingData, grandTotal, setBookingData, setGrandTotal } = React.useContext(BookingDataContext);
    const { _hotelId, _userId } = useParams();
    const hotel = JSON.parse(localStorage.getItem("hotel"));
    const user = JSON.parse(localStorage.getItem("user"));
    // flag for redirecting to all bookings of users page..
    const [flag, setFlag] = React.useState(false);

    useEffect(() => {
        const savedBookingData = localStorage.getItem("bookingData");
        const savedGrandTotal = localStorage.getItem("grandTotal");

        if (!bookingData && savedBookingData) {
            setBookingData(JSON.parse(savedBookingData));
        }
        if (!grandTotal && savedGrandTotal) {
            setGrandTotal(savedGrandTotal);
        }

        if (bookingData) {
            localStorage.setItem("bookingData", JSON.stringify(bookingData));
        }
        if (grandTotal) {
            localStorage.setItem("grandTotal", grandTotal);
        }
    }, [bookingData, grandTotal, setBookingData, setGrandTotal]);

    if (!bookingData || bookingData.length === 0) {
        return <div className="text-center text-2xl font-bold text-red-500">No booking data available.</div>;
    }

    const handleCheckout = async () => {
        try {
            const { data } = await axios.post("/book/hotel", {
                bookingUser: _userId,
                bookingHotel: _hotelId,
                bookingDetail: bookingData,
                grandCost: grandTotal,
                bookingStatus: 'confirmed'
            });
            toast.success(data.message);
            setFlag(true);
        } catch (e) {
            toast.error(e.response.data.error.message);
        };
    };

    if (flag) {
        return <Navigate to="/profile/user/allbooking" />
    }

    return (
        <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center">
            
            <h1 className="text-3xl font-bold text-[#FF6500] mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                {/* Left section - Booking Details */}
                <div className="col-span-2 bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-6">Booking Details</h2>
                    {bookingData.map((booking, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6 mb-6">
                            <div className="text-lg mb-2 flex items-center">
                                <FaBed className="text-gray-700 mr-2" />
                                <span className="text-gray-700">Room Type:</span>
                                <span className="ml-2">{booking.selectedRoomType}</span>
                            </div>
                            <div className="text-lg mb-2 flex items-center">
                                <FaCalendarAlt className="text-gray-700 mr-2" />
                                <span className="text-gray-700">Number of Rooms:</span>
                                <span className="ml-2">{booking.numRooms}</span>
                            </div>
                            <div className="text-lg mb-2 flex items-center">
                                <FaCalendarAlt className="text-gray-700 mr-2" />
                                <span className="text-gray-700">Check-in:</span>
                                <span className="ml-2">{booking.checkIn}</span>
                            </div>
                            <div className="text-lg mb-2 flex items-center">
                                <FaCalendarAlt className="text-gray-700 mr-2" />
                                <span className="text-gray-700">Check-out:</span>
                                <span className="ml-2">{booking.checkOut}</span>
                            </div>
                            <div className="text-xl font-semibold flex items-center mt-4">
                                <span className="text-[#FF6500]">Total Cost:</span>
                                <span className="ml-2">₹{booking.totalCost}</span>
                            </div>
                        </div>
                    ))}
                    <div className="text-xl flex justify-between mt-4">
                        <span>Grand Total:</span>
                        <span>₹{grandTotal || 0}</span>
                    </div>
                </div>

                {/* Right section - User and Hotel Details */}
                <div className="bg-[#1E3E62] text-white p-6 rounded-md shadow-md">
                    <h2 className="text-2xl mb-6">Booking Information</h2>

                    {/* User Details */}
                    <div className="mb-4">
                        <h3 className="text-xl text-[#FF6500] mb-2">User Details</h3>
                        <p className="text-lg">
                            <span className="text-gray-300">Name:</span>
                            <span className="text-white ml-2">{user?.userName || "N/A"}</span>
                        </p>
                        <p className="text-lg">
                            <span className="text-gray-300">Email:</span>
                            <span className="text-white ml-2">{user?.userEmail || "N/A"}</span>
                        </p>
                    </div>

                    {/* Hotel Details */}
                    <div className="mb-4">
                        <h3 className="text-xl text-[#FF6500] mb-2">Hotel Details</h3>
                        <p className="text-lg">
                            <span className="text-gray-300">Hotel Name:</span>
                            <span className="text-white ml-2">{hotel?.hotelName || "N/A"}</span>
                        </p>
                        <p className="text-lg">
                            <span className="text-gray-300">Hotel Location:</span>
                            <span className="text-white ml-2">{`${hotel?.hotelCity}, ${hotel?.hotelStreet}`}</span>
                        </p>
                    </div>


                    {/* Payment Method */}
                    <div className="mb-4">
                        <h3 className="text-xl mb-2">Payment By Cash</h3>
                    </div>

                    <button
                        className="w-full bg-[#FF6500] text-white py-3 px-6 rounded-md hover:bg-[#e55400] transition-all"
                        onClick={handleCheckout}
                    >
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;

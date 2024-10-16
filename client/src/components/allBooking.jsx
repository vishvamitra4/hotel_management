import React from "react";
import { UserContext } from "../contexts/user/userContext";
import axios from "axios";
import { toast , ToastContainer } from "react-toastify";

function AllBooking() {
    const { user } = React.useContext(UserContext);
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const [filteredData, setFilteredData] = React.useState([]);
    const [filter, setFilter] = React.useState({
        hotelName: '',
        createdAt: '',
        bookingStatus: '',
        flag: isAdmin
    });
    const [expandedIndex, setExpandedIndex] = React.useState(null);

    if (!user) return <h1 className="text-center text-xl">Loading..</h1>;

    const fetchBookings = async () => {
        try {
            const query = new URLSearchParams(filter).toString();
            const { data } = await axios(`/fetch/booking/${user?._id}?${query}`);
            setFilteredData(data.data);
        } catch (e) {
            toast.error(e.response.data.error.message);
        }
    };

    React.useEffect(() => {
        fetchBookings();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter(prev => ({ ...prev, [name]: value }));
    };

    const toggleDetails = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const { data } = await axios.put(`/cancel/booking/${bookingId}`);
            toast.success(data.message);
            fetchBookings();
        } catch (e) {
            toast.error(e.response.data.error.message);
        }
    };

    return (
        <div className="p-6 w-[800px] mt-5 mb-[20rem] bg-white text-black shadow-md rounded-lg">
            
            <h1 className="text-2xl font-bold mb-4 text-[#FF6500]">All Bookings</h1>


            <div className="flex flex-col mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="hotelName">Hotel Name</label>
                    <input
                        type="text"
                        id="hotelName"
                        name="hotelName"
                        placeholder="Filter by Hotel Name"
                        value={filter.hotelName}
                        onChange={handleFilterChange}
                        className="border rounded p-2 w-full bg-gray-100 text-black border-gray-300 focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="createdAt">Created At</label>
                    <input
                        type="date"
                        id="createdAt"
                        name="createdAt"
                        value={filter.createdAt}
                        onChange={handleFilterChange}
                        className="border rounded p-2 w-full bg-gray-100 text-black border-gray-300 focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2" htmlFor="bookingStatus">Booking Status</label>
                    <select
                        id="bookingStatus"
                        name="bookingStatus"
                        value={filter.bookingStatus}
                        onChange={handleFilterChange}
                        className="border rounded p-2 w-full bg-gray-100 text-black border-gray-300 focus:border-[#FF6500] focus:ring-2 focus:ring-[#FF6500]"
                    >
                        <option value="">All</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
                <button
                    onClick={fetchBookings}
                    className="rounded px-4 py-2 w-[25%] bg-[#FF6500] text-white hover:bg-[#1E3E62]"
                >
                    Search
                </button>
            </div>


            {filteredData.length > 0 ? (
                filteredData.map((booking, index) => (
                    <div
                        key={booking._id}
                        className={`border p-4 mb-4 rounded-lg shadow-md ${booking.bookingStatus === 'canceled' ? 'opacity-60' : ''}`}
                        style={{
                            borderColor: booking.bookingStatus === 'canceled' ? "#FF6500" : "#e5e7eb",
                            backgroundColor: booking.bookingStatus === 'canceled' ? "#f8f9fa" : "#ffffff"
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">Hotel: {booking.bookingHotel.hotelName}</h2>
                                <p>Created On: {new Date(booking.created).toLocaleDateString()}</p>
                                <p>Grand Cost: ₹{booking.grandCost}</p>
                                <p>Status: <span style={{ color: booking.bookingStatus === 'canceled' ? '#FF6500' : '#1E3E62' }}>{booking.bookingStatus}</span></p>
                            </div>
                            <div>
                                {isAdmin === false && booking.bookingStatus !== "canceled" && (
                                    <button
                                        onClick={() => handleCancelBooking(booking._id)}
                                        className="rounded px-4 py-2 mr-2 bg-[#FF6500] text-white hover:bg-[#1E3E62]"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                                <button
                                    className="rounded px-4 py-2 bg-[#1E3E62] text-white hover:bg-[#FF6500]"
                                    onClick={() => { toggleDetails(index) }}
                                >
                                    {expandedIndex === index ? "Hide Details" : "Show Details"}
                                </button>
                            </div>
                        </div>


                        {expandedIndex === index && (
                            <div className="mt-4 border-t pt-2" style={{ borderTopColor: "#FF6500" }}>
                                <h3 className="font-semibold">Booking Details:</h3>
                                {isAdmin === true && booking.bookingUser && (
                                    <>
                                        <p>UserName: {booking.bookingUser.userName}</p>
                                        <p>UserEmail: {booking.bookingUser.userEmail}</p>
                                        <p>UserPh.No: {booking.bookingUser.userPhoneNumber}</p>
                                    </>
                                )}
                                {booking.bookingDetail.map((detail, i) => (
                                    <div key={i} className="mt-2">
                                        <p>Room Type: {detail.selectedRoomType}</p>
                                        <p>Check-In: {new Date(detail.checkIn).toLocaleDateString()}</p>
                                        <p>Check-Out: {new Date(detail.checkOut).toLocaleDateString()}</p>
                                        <p>Number of Rooms: {detail.numRooms}</p>
                                        <p>Total Cost: ₹{detail.totalCost}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center">No bookings found.</p>
            )}
        </div>
    );
}

export default AllBooking;

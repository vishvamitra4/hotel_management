import React from "react";
import { UserContext } from "../contexts/user/userContext";
import axios from "axios";

function AllBooking() {
    const { user } = React.useContext(UserContext);
    const isAdmin = localStorage.getItem("isAdmin");

    // user of a particular booking...
    const [userDetail, setUserDetail] = React.useState(null);

    const [filteredData, setFilteredData] = React.useState([]);
    const [filter, setFilter] = React.useState({
        hotelName: '',
        createdAt: '',
        flag: (isAdmin === "true") ? true : false
    });
    const [expandedIndex, setExpandedIndex] = React.useState(null);

    if (!user) return <h1 className="text-center text-xl">Loading..</h1>;

    const fetchBookings = async () => {
        try {
            const query = new URLSearchParams(filter).toString(); // Create query string from filter
            const { data } = await axios(`/fetch/booking/${user._id}?${query}`);
            setFilteredData(data.data);
        } catch (e) {
            alert(e.response.data.error.message);
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

    const fetchUserDetail = async (userId) => {
        if (isAdmin == "true") {
            try {
                const { data } = await axios.get(`/profile/${userId}`);
                setUserDetail(data.data);
            } catch (e) {
                console.log(e.response.data.error.message);
                setUserDetail(null);
            }
        }
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">All Bookings</h1>

            {/* Filters */}
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
                        className="border rounded p-2 w-full"
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
                        className="border rounded p-2 w-full"
                    />
                </div>
                <button
                    onClick={fetchBookings}
                    className="bg-blue-500 text-white rounded px-4 py-2 w-full"
                >
                    Search
                </button>
            </div>

            {/* Booking List */}
            {filteredData.length > 0 ? (
                filteredData.map((booking, index) => (
                    <div key={booking._id} className="border p-4 mb-4 rounded shadow-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="font-semibold">Hotel: {booking.bookingHotelName}</h2>
                                <p>Created On: {new Date(booking.created).toLocaleDateString()}</p>
                                <p>Grand Cost: ₹{booking.grandCost}</p>
                                <p>Status: {booking.bookingStatus}</p>
                            </div>
                            <div>
                                {
                                    isAdmin == "false" &&
                                    <button className="bg-red-500 text-white rounded px-4 py-2 mr-2">Cancel Booking</button>
                                }
                                <button
                                    className="bg-blue-500 text-white rounded px-4 py-2"
                                    onClick={() => { fetchUserDetail(booking.bookingUser), toggleDetails(index) }}
                                >
                                    {expandedIndex === index ? "Hide Details" : "Show Details"}
                                </button>
                            </div>
                        </div>

                        {/* Booking Details Dropdown */}
                        {expandedIndex === index && (
                            <div className="mt-4 border-t pt-2">
                                <h3 className="font-semibold">Booking Details:</h3>
                                {
                                    userDetail &&
                                    <>
                                        <p>UserName : {userDetail.userName}</p>
                                        <p>UserEmail : {userDetail.userEmail}</p>
                                        <p>UserPh.No : {userDetail.userPhoneNumber}</p>
                                    </>
                                }
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

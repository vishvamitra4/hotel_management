import React, { useState } from 'react';

const HotelForm = () => {
    const [formData, setFormData] = useState({
        hotelName: '',
        hotelStar: 1,
        hotelRating: 5,
        hotelDescription: '',
        hotelTags: [],
        hotelImages: [],
        hotelStreet: '',
        hotelCity: '',
        hotelState: '',
        hotelZipcode: '',
        hotelGoogleMapUrl: '',
        hotelOwnerName: '',
        hotelOwnerEmail: '',
        hotelOwnerContacts: [],
        hotelRoomTypes: [],
        hotelRoomsDetail: [
            {
                roomType: '',
                roomDetail: '',
                totalRooms: 0,
                pricePerDay: 0,
                bookedDates: []
            }
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        setFormData({ ...formData, [field]: value.split(',') });
    };

    const handleRoomsChange = (index, field, value) => {
        const updatedRooms = [...formData.hotelRoomsDetail];
        updatedRooms[index] = { ...updatedRooms[index], [field]: value };
        setFormData({ ...formData, hotelRoomsDetail: updatedRooms });
    };

    const addNewRoom = () => {
        setFormData({
            ...formData,
            hotelRoomsDetail: [
                ...formData.hotelRoomsDetail,
                { roomType: '', roomDetail: '', totalRooms: 0, pricePerDay: 0, bookedDates: [] }
            ]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Submit form logic here
    };

    return (
        <form className="w-full max-w-lg mx-auto p-6 bg-white shadow-md rounded" onSubmit={handleSubmit}>
            <h1 className="text-xl font-bold mb-4">Hotel Registration Form</h1>

            <div className="mb-4">
                <label className="block text-gray-700">Hotel Name</label>
                <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Hotel Star Rating</label>
                <input
                    type="number"
                    name="hotelStar"
                    value={formData.hotelStar}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    max="8"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Hotel Rating</label>
                <input
                    type="number"
                    name="hotelRating"
                    value={formData.hotelRating}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="0"
                    max="5"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Hotel Description</label>
                <textarea
                    name="hotelDescription"
                    value={formData.hotelDescription}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Tags (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelTags.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelTags')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Hotel Images (comma-separated URLs)</label>
                <input
                    type="text"
                    value={formData.hotelImages.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelImages')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Street</label>
                <input
                    type="text"
                    name="hotelStreet"
                    value={formData.hotelStreet}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">City</label>
                <input
                    type="text"
                    name="hotelCity"
                    value={formData.hotelCity}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">State</label>
                <input
                    type="text"
                    name="hotelState"
                    value={formData.hotelState}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Zip Code</label>
                <input
                    type="text"
                    name="hotelZipcode"
                    value={formData.hotelZipcode}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Google Map URL</label>
                <input
                    type="text"
                    name="hotelGoogleMapUrl"
                    value={formData.hotelGoogleMapUrl}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Owner Name</label>
                <input
                    type="text"
                    name="hotelOwnerName"
                    value={formData.hotelOwnerName}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Owner Email</label>
                <input
                    type="email"
                    name="hotelOwnerEmail"
                    value={formData.hotelOwnerEmail}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Owner Contacts (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelOwnerContacts.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelOwnerContacts')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700">Room Types (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelRoomTypes.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelRoomTypes')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Add Rooms Details */}
            <div className="mb-6">
                <label className="block text-gray-700">Room Details</label>
                {formData.hotelRoomsDetail.map((room, index) => (
                    <div key={index} className="mb-4 p-4 border rounded-md">
                        <div className="mb-2">
                            <label className="block text-gray-700">Room Type</label>
                            <input
                                type="text"
                                value={room.roomType}
                                onChange={(e) => handleRoomsChange(index, 'roomType', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Room Detail</label>
                            <input
                                type="text"
                                value={room.roomDetail}
                                onChange={(e) => handleRoomsChange(index, 'roomDetail', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Total Rooms</label>
                            <input
                                type="number"
                                value={room.totalRooms}
                                onChange={(e) => handleRoomsChange(index, 'totalRooms', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700">Price Per Day</label>
                            <input
                                type="number"
                                value={room.pricePerDay}
                                onChange={(e) => handleRoomsChange(index, 'pricePerDay', e.target.value)}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewRoom}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add New Room
                </button>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default HotelForm;

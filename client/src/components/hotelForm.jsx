import React, { useState } from 'react';
import axios from "axios";

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

    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'hotelName':
                if (!value || value.length < 1 || value.length > 60) {
                    error = 'Hotel name is required and should be between 1 to 60 characters.';
                }
                break;
            case 'hotelStar':
                if (value < 1 || value > 8) {
                    error = 'Hotel star rating should be between 1 and 8.';
                }
                break;
            case 'hotelRating':
                if (value < 0 || value > 5) {
                    error = 'Hotel rating should be between 0 and 5.';
                }
                break;
            case 'hotelDescription':
                if (!value) {
                    error = 'Hotel description is required.';
                }
                break;
            case 'hotelZipcode':
                if (!value.match()) {
                    error = 'Zipcode should be a valid 5-digit number.';
                }
                break;
            case 'hotelOwnerEmail':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Please enter a valid email address.';
                }
                break;
            case 'hotelOwnerContacts':
                if (value.length === 0) {
                    error = 'Owner contacts are required.';
                }
                break;
            case 'hotelRoomTypes':
                if (value.length === 0) {
                    error = 'At least one room type is required.';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, field) => {
        const { value } = e.target;
        const error = validateField(field, value.split(','));
        setErrors({ ...errors, [field]: error });
        setFormData({ ...formData, [field]: value.split(',') });
    };

    const handleRoomsChange = (index, field, value) => {
        const updatedRooms = [...formData.hotelRoomsDetail];
        updatedRooms[index] = { ...updatedRooms[index], [field]: value };
        const error = validateField(field, value);
        setErrors({ ...errors, [`room-${index}-${field}`]: error });
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

    const handleSubmit = async (e) => {

        e.preventDefault();
        const newErrors = {};
        // Validate all fields before submitting
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                console.log(formData);
                const { data } = await axios.post("/new/hotel", formData);
                alert(data.message);
            } catch (e) {
                alert(e.response.data.error.message);
            }
        } else {
            console.log(newErrors);
            alert('Please put the input in correct format...');
        };
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
                {errors.hotelName && <p className="text-red-500 text-sm">{errors.hotelName}</p>}
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
                {errors.hotelStar && <p className="text-red-500 text-sm">{errors.hotelStar}</p>}
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
                {errors.hotelRating && <p className="text-red-500 text-sm">{errors.hotelRating}</p>}
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
                {errors.hotelDescription && <p className="text-red-500 text-sm">{errors.hotelDescription}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Tags (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelTags.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelTags')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.hotelTags && <p className="text-red-500 text-sm">{errors.hotelTags}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Hotel Images (comma-separated URLs)</label>
                <input
                    type="text"
                    value={formData.hotelImages.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelImages')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.hotelImages && <p className="text-red-500 text-sm">{errors.hotelImages}</p>}
            </div>

            {/* Additional fields here */}
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
                {errors.hotelStreet && <p className="text-red-500 text-sm">{errors.hotelStreet}</p>}
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
                {errors.hotelCity && <p className="text-red-500 text-sm">{errors.hotelCity}</p>}
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
                {errors.hotelState && <p className="text-red-500 text-sm">{errors.hotelState}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Zipcode</label>
                <input
                    type="text"
                    name="hotelZipcode"
                    value={formData.hotelZipcode}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
                {errors.hotelZipcode && <p className="text-red-500 text-sm">{errors.hotelZipcode}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Google Map URL</label>
                <input
                    type="url"
                    name="hotelGoogleMapUrl"
                    value={formData.hotelGoogleMapUrl}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                />
                {errors.hotelGoogleMapUrl && <p className="text-red-500 text-sm">{errors.hotelGoogleMapUrl}</p>}
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
                {errors.hotelOwnerName && <p className="text-red-500 text-sm">{errors.hotelOwnerName}</p>}
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
                {errors.hotelOwnerEmail && <p className="text-red-500 text-sm">{errors.hotelOwnerEmail}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Owner Contacts (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelOwnerContacts.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelOwnerContacts')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.hotelOwnerContacts && <p className="text-red-500 text-sm">{errors.hotelOwnerContacts}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">HotelRoomTypes</label>
                <input
                    type="text"
                    value={formData.hotelRoomTypes.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelRoomTypes')}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {errors.hotelRoomTypes && <p className="text-red-500 text-sm">{errors.hotelRoomTypes}</p>}
            </div>

            {/* Hotel Rooms */}
            {formData.hotelRoomsDetail.map((room, index) => (
                <div key={index} className="mb-4 border-t border-gray-200 pt-4">
                    <h2 className="text-lg font-semibold mb-2">Room {index + 1}</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700">Room Type</label>
                        <input
                            type="text"
                            value={room.roomType}
                            onChange={(e) => handleRoomsChange(index, 'roomType', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors[`room-${index}-roomType`] && <p className="text-red-500 text-sm">{errors[`room-${index}-roomType`]}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Room Detail</label>
                        <input
                            type="text"
                            value={room.roomDetail}
                            onChange={(e) => handleRoomsChange(index, 'roomDetail', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors[`room-${index}-roomDetail`] && <p className="text-red-500 text-sm">{errors[`room-${index}-roomDetail`]}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Total Rooms</label>
                        <input
                            type="number"
                            value={room.totalRooms}
                            onChange={(e) => handleRoomsChange(index, 'totalRooms', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="1"
                        />
                        {errors[`room-${index}-totalRooms`] && <p className="text-red-500 text-sm">{errors[`room-${index}-totalRooms`]}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Price Per Day</label>
                        <input
                            type="number"
                            value={room.pricePerDay}
                            onChange={(e) => handleRoomsChange(index, 'pricePerDay', e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                            min="1"
                        />
                        {errors[`room-${index}-pricePerDay`] && <p className="text-red-500 text-sm">{errors[`room-${index}-pricePerDay`]}</p>}
                    </div>
                </div>
            ))}

            <button type="button" onClick={addNewRoom} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md">
                Add New Room
            </button>

            <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default HotelForm;

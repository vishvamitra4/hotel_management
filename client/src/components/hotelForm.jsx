import React, { useState } from 'react';
import axios from "axios";
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const HotelForm = () => {
    const { _id } = useParams();
    const [flag, setFlag] = useState(false);
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

    React.useEffect(() => {
        const fetchHotel = async () => {
            try {
                if (_id !== undefined) {
                    const { data } = await axios.get(`/fetch/hotels/${_id}`);
                    setFormData(data.data);
                }
            } catch (e) {
                alert(e.response.data.error);
            };
        };
        fetchHotel();
    }, [_id]);

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
                if (!/^\d{5}$/.test(value)) {
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                delete formData['_id'];
                delete formData['modified'];
                delete formData['created'];
                formData.hotelRoomsDetail.forEach((item) => {
                    delete item['_id'];
                });
                const { data } = await axios.put(`/update/hotel/${_id}`, formData);
                setFlag(true);
                toast.success(data.message);
            } catch (e) {
                toast.error(e.response.data.error.message);
            }
        } else {
            alert('Please put the input in correct format...');
        };
    };

    if (flag) {
        return <Navigate to={`/profile/admin/allhotels`} />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const { data } = await axios.post("/new/hotel", formData);
                toast.success(data.message);
            } catch (e) {
                toast(e.response.data.error.message);
            }
        } else {
            toast.error('Please put the input in correct format...' , newErrors);
        };
    };

    return (
        <form className="w-full w-[600px] mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{`${_id ? "Update Hotel" : "Hotel Registration Form"}`}</h1>

            {/** Hotel Name */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Hotel Name</label>
                <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
                {errors.hotelName && <p className="text-red-500 text-sm">{errors.hotelName}</p>}
            </div>

            {/** Hotel Star Rating */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Hotel Star Rating</label>
                <input
                    type="number"
                    name="hotelStar"
                    value={formData.hotelStar}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    min="1"
                    max="8"
                    required
                />
                {errors.hotelStar && <p className="text-red-500 text-sm">{errors.hotelStar}</p>}
            </div>

            {/** Hotel Rating */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Hotel Rating</label>
                <input
                    type="number"
                    name="hotelRating"
                    value={formData.hotelRating}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    min="0"
                    max="5"
                />
                {errors.hotelRating && <p className="text-red-500 text-sm">{errors.hotelRating}</p>}
            </div>

            {/** Hotel Description */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Hotel Description</label>
                <textarea
                    name="hotelDescription"
                    value={formData.hotelDescription}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
                {errors.hotelDescription && <p className="text-red-500 text-sm">{errors.hotelDescription}</p>}
            </div>

            {/** Tags */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Tags (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelTags.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelTags')}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                />
                {errors.hotelTags && <p className="text-red-500 text-sm">{errors.hotelTags}</p>}
            </div>

            {/** Street */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Street</label>
                <input
                    type="text"
                    name="hotelStreet"
                    value={formData.hotelStreet}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
            </div>

            {/** City */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">City</label>
                <input
                    type="text"
                    name="hotelCity"
                    value={formData.hotelCity}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
            </div>

            {/** State */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">State</label>
                <input
                    type="text"
                    name="hotelState"
                    value={formData.hotelState}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
            </div>

            {/** Zip Code */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Zip Code</label>
                <input
                    type="text"
                    name="hotelZipcode"
                    value={formData.hotelZipcode}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
                {errors.hotelZipcode && <p className="text-red-500 text-sm">{errors.hotelZipcode}</p>}
            </div>

            {/** Google Map URL */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Google Map URL</label>
                <input
                    type="url"
                    name="hotelGoogleMapUrl"
                    value={formData.hotelGoogleMapUrl}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                />
            </div>

            {/** Owner Name */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Owner Name</label>
                <input
                    type="text"
                    name="hotelOwnerName"
                    value={formData.hotelOwnerName}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
            </div>

            {/** Owner Email */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Owner Email</label>
                <input
                    type="email"
                    name="hotelOwnerEmail"
                    value={formData.hotelOwnerEmail}
                    onChange={handleInputChange}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                    required
                />
                {errors.hotelOwnerEmail && <p className="text-red-500 text-sm">{errors.hotelOwnerEmail}</p>}
            </div>

            {/** Owner Contacts */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold">Owner Contacts (comma-separated)</label>
                <input
                    type="text"
                    value={formData.hotelOwnerContacts.join(',')}
                    onChange={(e) => handleArrayChange(e, 'hotelOwnerContacts')}
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                />
                {errors.hotelOwnerContacts && <p className="text-red-500 text-sm">{errors.hotelOwnerContacts}</p>}
            </div>

            {/** Room Types */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Room Types</h2>
                {formData.hotelRoomsDetail.map((room, index) => (
                    <div key={index} className="border p-4 rounded-lg mb-4">
                        <h3 className="font-semibold">Room Type {index + 1}</h3>
                        <label className="block text-gray-700">Type</label>
                        <input
                            type="text"
                            value={room.roomType}
                            onChange={(e) => handleRoomsChange(index, 'roomType', e.target.value)}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                        />
                        <label className="block text-gray-700 mt-4">Details</label>
                        <textarea
                            value={room.roomDetail}
                            onChange={(e) => handleRoomsChange(index, 'roomDetail', e.target.value)}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                        />
                        <label className="block text-gray-700 mt-4">Total Rooms</label>
                        <input
                            type="number"
                            value={room.totalRooms}
                            onChange={(e) => handleRoomsChange(index, 'totalRooms', e.target.value)}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                            min="1"
                        />
                        <label className="block text-gray-700 mt-4">Price Per Day</label>
                        <input
                            type="number"
                            value={room.pricePerDay}
                            onChange={(e) => handleRoomsChange(index, 'pricePerDay', e.target.value)}
                            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#FF6500]"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewRoom}
                    className="bg-[#FF6500] text-white px-4 py-2 rounded-md mt-2"
                >
                    Add New Room Type
                </button>
            </div>

            <button type="submit" onClick={handleUpdate} className="w-full bg-[#FF6500] text-white px-4 py-2 rounded-md">
                {`${_id ? "Update Hotel" : "Add Hotel"}`}
            </button>
        </form>
    );
};

export default HotelForm;

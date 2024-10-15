import React from 'react';

const SearchInput = ({ value, onChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">Hotel Name</label>
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Hotel Name.."
            />
        </div>
    );
};

export default SearchInput;

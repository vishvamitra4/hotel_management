import React from 'react';

const Dropdown = ({ label, options, value, onChange }) => {
    return (
        <div className="flex items-center space-x-2">
            <label className="text-gray-700">{label}:</label>
            <select
                value={value}
                onChange={onChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <option value="">Select</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

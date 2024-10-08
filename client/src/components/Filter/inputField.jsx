import React from 'react';

const InputField = ({ label, value, placeholder, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-gray-700">{label}:</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;

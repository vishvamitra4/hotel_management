import React, { useState } from 'react';
import SearchInput from './searchInput';
import Dropdown from './dropDown';
import InputField from './inputField';

const Filter = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [value, setValue] = useState('');

  const handleFilter = (e) => {
    e.preventDefault();

    // Pass the filter values to the parent component (Home)
    onFilter({ search, sortBy, value });
  };

  const options = [
    { label: 'Zip Code', value: 'zipcode' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' }
  ];

  const renderInputField = () => {
    switch (sortBy) {
      case 'zipcode':
        return <InputField label="Zip Code" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter Zip Code" />;
      case 'city':
        return <InputField label="City" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter City" />;
      case 'state':
        return <InputField label="State" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter State" />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleFilter} className="flex justify-center w-[100%] items-center bg-gray-100 p-4 rounded-lg shadow-md space-x-4">
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
      <Dropdown label="Search By" options={options} value={sortBy} onChange={(e) => setSortBy(e.target.value)} />
      {sortBy && renderInputField()}
      <button type="submit" className="bg-[#1f2937] w-[13%] text-white p-2 rounded-md hover:bg-blue-600 transition">
        Filter
      </button>
    </form>
  );
};

export default Filter;

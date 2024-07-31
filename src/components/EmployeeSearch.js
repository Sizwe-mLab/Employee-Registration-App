import React, { useState } from 'react';

const EmployeeSearch = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="employee-search">
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search by employee ID..."
      />
    </div>
  );
};

export default EmployeeSearch;
import React from 'react';

function Filters() {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <div className="flex flex-col space-y-4">
        {/* Date Filter */}
        <div>
          <label htmlFor="date" className="block font-medium mb-1">Date:</label>
          <input type="date" id="date" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" />
        </div>
        {/* Category Filter */}
        <div>
          <label htmlFor="category" className="block font-medium mb-1">Category:</label>
          <select id="category" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
            <option value="">All</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="workshop">Workshop</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        {/* Location Filter */}
        <div>
          <label htmlFor="location" className="block font-medium mb-1">Location:</label>
          <input type="text" id="location" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter location" />
        </div>
        {/* Add more filters as needed */}
      </div>
    </div>
  );
}

export default Filters;

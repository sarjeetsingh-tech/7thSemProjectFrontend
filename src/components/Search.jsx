import React, { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { RiCloseCircleFill } from 'react-icons/ri'; // Import the close circle icon

const Search = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isLocationFocused, setIsLocationFocused] = useState(false);
    const [isInputFilled, setIsInputFilled] = useState(false); // State to track if input is filled

    const handleLocationFocus = () => {
        setIsLocationFocused(true);
    };

    const handleLocationBlur = () => {
        setIsLocationFocused(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setIsInputFilled(!!e.target.value); // Check if input is filled
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Call the onSearch function with the search query
        onSearch(searchQuery);
    };

    const handleSearchFocus = () => {
        setIsLocationFocused(false);
    };

    const handleSearchBlur = () => {
        // Handle blur for search bar if needed
    };

    const handleClearInput = () => {
        setSearchQuery(''); // Clear the search query
        setIsInputFilled(false); // Update input filled state
    };

    return (
        <form onSubmit={handleSearchSubmit} className="flex flex-row p-3 bg-gray-100">
            <div className={`relative flex items-center  flex-row w-[75%] h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden ${isLocationFocused ? 'shadow-md' : ''}`}>
                <div className="grid place-items-center h-full w-24 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-8" // Increased padding for clear icon
                    type="text"
                    id="search"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                />
                {isInputFilled && ( // Render close icon only if input is filled
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <RiCloseCircleFill className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl" onClick={handleClearInput} />
                    </div>
                )}
            </div>
            <button type="submit" className="ml-4 px-8 py-1 bg-black text-white rounded-md hover:bg-grey-600 focus:outline-none focus:bg-grey-600">Search</button>
            <div className='flex items-center ml-2' >
                <CiLocationOn className="text-3xl font-extrabold text-gray-700" />
                <p className=' font-semibold text-gray-800'>Select Location</p>
            </div>
        </form>
    );
};

export default Search;

"use client";
import '../styles/output.css'

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
        className="w-full p-2 rounded-lg border border-gray-300"
        placeholder="Search by Apartment ID"
      />
    </div>
  );
};

export default SearchBar;

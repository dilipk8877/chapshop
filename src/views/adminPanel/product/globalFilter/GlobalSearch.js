import React from "react";

const GlobalSearch = ({ filter, setFilter }) => {
  return (
    <div>
      <input
        type="search"
        className="search-input"
        placeholder="Search Here"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalSearch;

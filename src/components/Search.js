import React from "react";

function Search(props) {
  const {filterSearch, setFilterSearch} = props;

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Custom Cards by Name:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        onChange={(e) => setFilterSearch(e.target.value)}
        value={filterSearch}
      />
    </div>
  );
}

export default Search;
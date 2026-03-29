import "./searchBar.css";
import React from "react";
import { useState } from "react";

export default function SearchBar({ searchSpotify, searchOmdb }) {
  const [term, setTerm] = useState("");

  const handleSearchChange = (e) => {
    setTerm(e.target.value);
  };
  const handleSearch = () => {
    searchSpotify(term);
  };

  const handleSearchFilm = () => {
    searchOmdb(term);
  };
  return (
    <div className="SearchBar">
      <input
        placeholder="Enter film/series title to search soundtracks"
        value={term}
        onChange={handleSearchChange}
      />
      <button
        className="SearchButton"
        onClick={() => {
          handleSearch();
          handleSearchFilm();
        }}
      >
        SEARCH
      </button>
    </div>
  );
}

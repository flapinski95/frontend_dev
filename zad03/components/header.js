import React, { useState } from "react";
import styles from "../app/page.module.css";

const Header = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(""); // Nowy stan do przechowywania wybranego typu

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    onFilterChange(type); // Wywołanie funkcji onFilterChange
  };

  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchbar}
        value={searchQuery}
        onInput={handleSearch} // Wartość onInput zostaje, ale możesz zamienić na onChange
      />
      <label htmlFor="type">Type:</label>
      <select
        name="type"
        id="type"
        value={selectedType}
        onChange={handleFilterChange} // Wywołanie zmiany filtra
      >
        <option value="">All</option> {/* Opcja "Wszystkie" */}
        <option value="1">Normal</option>
        <option value="2">Fighting</option>
        <option value="3">Flying</option>
        <option value="4">Poison</option>
        <option value="5">Ground</option>
        <option value="6">Rock</option>
        <option value="7">Bug</option>
        <option value="8">Ghost</option>
        <option value="9">Steel</option>
        <option value="10">Fire</option>
        <option value="11">Water</option>
        <option value="12">Water</option>
        <option value="13">Electric</option>
        <option value="14">Psychic</option>
        <option value="15">Ice</option>
        <option value="16">Dragon</option>
        <option value="5">Ground</option>
      </select>
    </header>
  );
};

export default Header;

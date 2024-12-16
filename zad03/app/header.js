// Header.js
import React, { useState } from "react";
import styles from "./page.module.css";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchbar}
        value={searchQuery}
        onInput={handleSearch}
      />
      <p className={styles.searchquery}>
        Searching for: {searchQuery || "Nothing yet"}
      </p>
    </header>
  );
};

export default Header;

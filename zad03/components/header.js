"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "../app/page.module.css";

const Header = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || ""
  );
  const [limit, setLimit] = useState(searchParams.get("limit") || 50);

  const updateUrl = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateUrl("search", value);
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    updateUrl("type", value);
  };

  const handleLimitChange = (e) => {
    const value = e.target.value;
    setLimit(value);
    updateUrl("limit", value);
  };

  return (
    <header className={styles.header}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchbar}
      />
      <div className={styles.select_boxes}>
        <label htmlFor="type" className={styles.p}>
          Type:
        </label>
        <select
          id="type"
          value={selectedType}
          onChange={handleTypeChange}
          className={styles.select}
        >
          <option value="">All</option>
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
          <option value="13">Electric</option>
          <option value="14">Psychic</option>
          <option value="15">Ice</option>
          <option value="16">Dragon</option>
        </select>
        <label htmlFor="limit" className={styles.p}>
          Results:
        </label>
        <input
          type="number"
          id="limit"
          min="10"
          max="100"
          value={limit}
          onChange={handleLimitChange}
          className={styles.select}
        />
      </div>
    </header>
  );
};

export default Header;

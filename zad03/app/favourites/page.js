"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  return (
    <div className={styles.page}>
      <h1>Favourite Pokémon</h1>
      {favourites.length > 0 ? (
        <ul>
          {favourites.map((name, index) => (
            <li key={index}>{name.name}</li>
          ))}
        </ul>
      ) : (
        <p>No favourites added yet.</p>
      )}
    </div>
  );
}

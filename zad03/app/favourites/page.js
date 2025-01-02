"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import Button from "../../components/button";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  const removeFavourite = (nameToRemove) => {
    const updatedFavourites = favourites.filter(
      (name) => name !== nameToRemove
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Zaktualizowanie localStorage
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.p}>Favourite Pokémon</h1>
      <div className={styles.with_margin}>
        {favourites.length > 0 ? (
          favourites.map((name, index) => (
            <div key={index} className={styles.list}>
              <div className={styles.poke_data}>
                <p>{name.name}</p>
                <button
                  onClick={() => removeFavourite(name)}
                  className={styles.button}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.p}>No favourites added yet.</p>
        )}
      </div>
    </div>
  );
}

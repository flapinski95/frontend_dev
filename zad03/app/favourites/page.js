"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import Header from "@/components/header";
import { PokemonList } from "@/components/display_Poke";
import { useSearchParams, useRouter } from "next/navigation";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  const updateUrl = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };
  const removeFavourite = (nameToRemove) => {
    const updatedFavourites = favourites.filter(
      (pokemon) => pokemon.name !== nameToRemove.name
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Zaktualizowanie localStorage
  };
  const handlePokemonClick = (name) => {
    router.push(`/pokemon/${name}`);
  };
  const toggleFavourite = (pokemon) => {
    // Sprawdzenie, czy Pokémon już jest w ulubionych
    const updatedFavourites = favourites.some(
      (fav) => fav.name === pokemon.name
    )
      ? favourites.filter((fav) => fav.name !== pokemon.name) // Usuwanie z ulubionych
      : [...favourites, pokemon]; // Dodawanie do ulubionych

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // Zaktualizowanie localStorage
  };
  const handleSearch = (query) => {
    updateUrl("search", query);
  };

  // Obsługa zmiany filtra typu Pokémonów
  const handleFilterChange = (type) => {
    updateUrl("type", type);
  };

  // Obsługa zmiany limitu wyników
  const handleLimitChange = (newLimit) => {
    updateUrl("limit", newLimit);
  };
  return (
    <div className={styles.page}>
      <Header
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
      />
      <PokemonList
        pokemons={favourites}
        onPokemonClick={handlePokemonClick}
        toggleFavourite={toggleFavourite}
        favourites={favourites}
      />
    </div>
  );
}

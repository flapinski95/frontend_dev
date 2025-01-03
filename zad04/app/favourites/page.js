"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import Header from "@/components/header";
import { PokemonList } from "@/components/display_Poke";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchDataList } from "@/components/fetch_functions";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const router = useRouter();
  const [originalFavouritesList, setOriginalFavouritesList] = useState([]);
  const searchParams = useSearchParams();
  // Odczytanie parametrów URL
  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("type") || "";
  const limit = parseInt(searchParams.get("limit"), 10) || 50;

  // Załaduj listę Pokémonów przy zmianie filtrów
  useEffect(() => {
    async function loadPokemonList() {
      const data = JSON.parse(localStorage.getItem("favourites") || "[]");
      const filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFavourites(filtered);
      setOriginalFavouritesList(data);
    }
    loadPokemonList();
  }, [filterType, searchQuery, limit]);

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
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };
  const handlePokemonClick = (name) => {
    router.push(`/pokemon/${name}`);
  };
  const toggleFavourite = (pokemon) => {
    const updatedFavourites = favourites.some(
      (fav) => fav.name === pokemon.name
    )
      ? favourites.filter((fav) => fav.name !== pokemon.name)
      : [...favourites, pokemon];

    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };
  const handleSearch = (query) => {
    updateUrl("search", query);
  };

  const handleFilterChange = (type) => {
    updateUrl("type", type);
  };

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

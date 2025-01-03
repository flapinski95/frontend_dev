"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { fetchDataList } from "../components/fetch_functions";
import { PokemonList } from "../components/display_Poke";
import Header from "../components/header";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [originalPokemonList, setOriginalPokemonList] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [comparison, setComparison] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("type") || "";
  const limit = parseInt(searchParams.get("limit"), 10) || 50;

  useEffect(() => {
    async function loadPokemonList() {
      const data = await fetchDataList(limit, filterType);
      const filtered = data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setPokemonList(filtered);
      setOriginalPokemonList(data);
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

  const handleSearch = (query) => {
    updateUrl("search", query);
  };

  const handleFilterChange = (type) => {
    updateUrl("type", type);
  };

  const handleLimitChange = (newLimit) => {
    updateUrl("limit", newLimit);
  };
  const toggleComparison = (pokemon) => {
    const updatedComparison = comparison.some(
      (com) => com.name === pokemon.name
    )
      ? comparison.filter((fav) => fav.name !== pokemon.name)
      : [...comparison, pokemon];

    setComparison(updatedComparison);
    localStorage.setItem("comparison", JSON.stringify(updatedComparison));
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

  const handlePokemonClick = (name) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div className={styles.page}>
      <Header
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        onLimitChange={handleLimitChange}
      />
      <div className={styles.boxes}>
        <PokemonList
          pokemons={pokemonList}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
          comparison={comparison}
          toggleComparison={toggleComparison}
          onPokemonClick={handlePokemonClick}
        />
      </div>
    </div>
  );
}

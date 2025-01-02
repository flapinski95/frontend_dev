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
  const searchParams = useSearchParams();
  const router = useRouter();

  // Odczytanie parametrów URL
  const searchQuery = searchParams.get("search") || "";
  const filterType = searchParams.get("type") || "";
  const limit = parseInt(searchParams.get("limit"), 10) || 50;

  // Załaduj listę Pokémonów przy zmianie filtrów
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

  // Załaduj ulubione z localStorage
  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  // Obsługa aktualizacji URL
  const updateUrl = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  // Obsługa wyszukiwania Pokémonów
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

  // Dodawanie i usuwanie z ulubionych
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

  // Obsługa kliknięcia w Pokémona
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
          onPokemonClick={handlePokemonClick}
        />
      </div>
    </div>
  );
}

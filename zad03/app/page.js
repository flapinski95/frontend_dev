"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import {
  fetchDataList,
  fetchPokemonDetails,
} from "../components/fetch_functions";
import { PokemonList, PokemonDetails } from "../components/display_Poke";
import Header from "../components/header";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [originalPokemonList, setOriginalPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [filterType, setFilterType] = useState(""); // Nowy stan dla filtra typu
  const searchParams = useSearchParams();
  const router = useRouter();

  // Załaduj listę Pokémonów po załadowaniu komponentu
  useEffect(() => {
    async function loadPokemonList() {
      const data = await fetchDataList(1000, filterType); // Uwzględniamy filtr typu
      setPokemonList(data);
      setOriginalPokemonList(data); // Przechowuj oryginalną listę do filtrowania
    }
    loadPokemonList();
  }, [filterType]); // Zależność od `filterType`

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  // Funkcja obsługująca kliknięcie w Pokemona
  const handlePokemonClick = async (name) => {
    const details = await fetchPokemonDetails(name);
    setSelectedPokemon(details);
    router.push(`/pokemon/${name}`);
  };

  // Funkcja wyszukiwania Pokémonów
  const handleSearch = (query) => {
    const filtered = originalPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setPokemonList(filtered);
  };

  // Funkcja zmiany filtra typu Pokémonów
  const handleFilterChange = (type) => {
    setFilterType(type); // Ustawiamy nowy typ
  };

  // Funkcja do dodawania i usuwania z ulubionych
  const toggleFavourite = (name) => {
    const updatedFavourites = favourites.includes(name)
      ? favourites.filter((fav) => fav !== name)
      : [...favourites, name];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className={styles.page}>
      <Header onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className={styles.boxes}>
        <PokemonList
          pokemons={pokemonList}
          onPokemonClick={handlePokemonClick}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
        {/* Komponent szczegółów Pokemona można dodać w razie potrzeby */}
        {/* <PokemonDetails pokemon={selectedPokemon} /> */}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { fetchDataList, fetchPokemonDetails } from "./fetch_functions";
import { PokemonList, PokemonDetails } from "./display_Poke";
import Header from "./header";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [originalPokemonList, setOriginalPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    async function loadPokemonList() {
      const data = await fetchDataList(searchParams.get("limit") || 50);
      setPokemonList(data);
      setOriginalPokemonList(data);
    }
    loadPokemonList();
  }, [searchParams]);

  useEffect(() => {
    const savedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(savedFavourites);
  }, []);

  const handlePokemonClick = async (name) => {
    const details = await fetchPokemonDetails(name);
    setSelectedPokemon(details);
  };

  const handleSearch = (query) => {
    const filtered = originalPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setPokemonList(filtered);

    const params = new URLSearchParams(searchParams);
    if (query) params.set("search", query);
    else params.delete("search");
    router.push(`/pokemon?${params.toString()}`);
  };

  const toggleFavourite = (name) => {
    const updatedFavourites = favourites.includes(name)
      ? favourites.filter((fav) => fav !== name)
      : [...favourites, name];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  return (
    <div className={styles.page}>
      <Header onSearch={handleSearch} />
      <div className={styles.boxes}>
        <PokemonList
          pokemons={pokemonList}
          onPokemonClick={handlePokemonClick}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
        <PokemonDetails pokemon={selectedPokemon} />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../../../components/fetch_functions";
import { use } from "react"; // Importujemy `use` do obsługi asynchronicznego `params`

export default function PokemonDetailPage({ params: paramsPromise }) {
  const [pokemon, setPokemon] = useState(null);

  // "Oczekujemy" na params za pomocą `use`
  const params = use(paramsPromise);
  const { id } = params; // Uzyskanie dynamicznego parametru z URL

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        const details = await fetchPokemonDetails(id); // Pobieranie szczegółów Pokemona
        setPokemon(details);
      }
    };

    fetchDetails();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>; // Pokazuje "Loading..." podczas ładowania
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}

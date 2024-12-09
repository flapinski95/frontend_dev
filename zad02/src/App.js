import React from "react";
import ReactDOM from "react-dom/client";

// Globalne zmienne do przechowywania stanu
let pokemonList = [];
let selectedPokemon = null;

// Funkcja do ustawienia wybranych szczegółów Pokémona
function setSelectedPokemon(pokemon) {
  selectedPokemon = pokemon;
  renderApp(); // Przeładuj widok po zmianie stanu
}

// Funkcja do ustawienia listy Pokémonów
function setPokemonList(list) {
  pokemonList = list;
  renderApp(); // Przeładuj widok po zmianie stanu
}

// Pobranie listy Pokémonów
async function fetchDataList() {
  const url = "https://pokeapi.co/api/v2/pokemon";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    setPokemonList(json.results);
  } catch (error) {
    console.error(error.message);
  }
}

// Pobranie szczegółów Pokémona
async function fetchPokemonDetails(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    setSelectedPokemon(json);
  } catch (error) {
    console.error(error.message);
  }
}

// Komponent listy Pokémonów
const PokemonList = ({ pokemons, onPokemonClick }) => {
  return (
    <div id="list">
      {pokemons.map((pokemon, index) => (
        <div
          key={index}
          className="poke-data"
          onClick={() => onPokemonClick(pokemon.name)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
              index + 1
            }.png`}
            alt={pokemon.name}
            style={{ width: "50px" }}
          />
          <span>
            {index + 1}. {pokemon.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Komponent szczegółów Pokémona
const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) {
    return <div id="traits">Select a Pokémon to see details</div>;
  }

  return (
    <div id="traits">
      <h2>Name: {pokemon.name}</h2>
      <div className="poke-stats">
        <h3>Types:</h3>
        {pokemon.types.map((item, index) => (
          <span key={index} style={{ marginRight: "10px" }}>
            {item.type.name}
          </span>
        ))}
      </div>
      <div className="poke-stats">
        <h3>Base Stats:</h3>
        {pokemon.stats.map((stat, index) => (
          <p key={index}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}
      </div>
      <div className="poke-stats">
        <h3>Physical Attributes:</h3>
        <p>Height: {pokemon.height} decimeters</p>
        <p>Weight: {pokemon.weight} hectograms</p>
      </div>
    </div>
  );
};

// Główny komponent App
const App = () => {
  // Jeśli lista Pokémonów jest pusta, to pobieramy dane
  if (pokemonList.length === 0) {
    fetchDataList(); // Pobierz dane, jeśli lista jest pusta
  }

  return (
    <div className="boxes">
      <PokemonList
        pokemons={pokemonList}
        onPokemonClick={fetchPokemonDetails}
      />
      <PokemonDetails pokemon={selectedPokemon} />
    </div>
  );
};

// Funkcja do renderowania aplikacji
function renderApp() {
  const root = document.getElementById("root");
  const reactRoot = ReactDOM.createRoot(root); // Tworzymy root z ReactDOM.createRoot
  reactRoot.render(<App />); // Renderujemy aplikację
}

// Start aplikacji
renderApp(); // Uruchomienie aplikacji po załadowaniu danych

let pokemonList = [];
let selectedPokemon = null;
let searchQuery = "";

function setSelectedPokemon(pokemon) {
  selectedPokemon = pokemon;
  renderApp();
}

function setPokemonList(list) {
  pokemonList = list;
  renderApp();
}

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

function renderApp(pokemonList) {
  const root = document.getElementById("root");
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(<App data={pokemonList} />);
}

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

const App = () => {
  if (pokemonList.length === 0) {
    fetchDataList();
  }

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header>
        <input
          type="text"
          placeholder="Search..."
          className="searchbar"
          value={searchQuery}
          onInput={(e) => {
            searchQuery = e.target.value;
            renderApp();
          }}
        />
        <p className="searchquery">
          Searching for: {searchQuery || "Nothing yet"}
        </p>
      </header>
      <div className="boxes">
        <PokemonList
          pokemons={filteredPokemonList}
          onPokemonClick={fetchPokemonDetails}
        />
        <PokemonDetails pokemon={selectedPokemon} />
      </div>
    </div>
  );
};

renderApp();

export default App;

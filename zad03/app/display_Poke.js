import styles from "./page.module.css";

const PokemonList = ({ pokemons, onPokemonClick }) => {
  const addToFavourites = (pokemon) => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.some((fav) => fav.name === pokemon.name)) {
      favourites.push(pokemon);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  };

  return (
    <div className={styles.list}>
      {pokemons.map((pokemon, index) => (
        <div
          key={index}
          className={styles.poke_data}
          onClick={() => onPokemonClick(pokemon.name)}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
              index + 1
            }.png`}
            alt={pokemon.name}
            style={{ width: "50px" }}
            className={styles.img}
          />
          <span>
            {index + 1}. {pokemon.name}
          </span>
          <button onClick={() => addToFavourites(pokemon)}>
            Add to Favourites
          </button>
        </div>
      ))}
    </div>
  );
};

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) {
    return <div className={styles.traits}>Select a Pokémon to see details</div>;
  }

  return (
    <div className={styles.traits}>
      <h2>Name: {pokemon.name}</h2>
      <div className="poke-stats">
        <h3>Types:</h3>
        {pokemon.types.map((item, index) => (
          <span key={index} style={{ marginRight: "10px" }}>
            {item.type.name}
          </span>
        ))}
      </div>
      <div className={styles.poke_stats}>
        <h3>Base Stats:</h3>
        {pokemon.stats.map((stat, index) => (
          <p key={index}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}
      </div>
      <div className={styles.poke_stats}>
        <h3>Physical Attributes:</h3>
        <p>Height: {pokemon.height} decimeters</p>
        <p>Weight: {pokemon.weight} hectograms</p>
      </div>
    </div>
  );
};

export { PokemonDetails, PokemonList };

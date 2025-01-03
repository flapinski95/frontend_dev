import styles from "../app/page.module.css";

const PokemonList = ({
  pokemons,
  onPokemonClick,
  favourites,
  toggleFavourite,
  comparison = [],
  toggleComparison,
}) => {
  return (
    <div className={styles.list}>
      {pokemons.map((pokemon, index) => (
        <div
          key={index}
          className={styles.poke_data}
          onClick={(e) => {
            e.stopPropagation();
            onPokemonClick(pokemon.name);
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
              pokemon.url.split("/")[6]
            }.png`}
            alt={pokemon.name}
            style={{ width: "50px" }}
            className={styles.img}
          />
          <span>
            {index + 1}. {pokemon.name}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleComparison(pokemon);
            }}
            className={
              comparison.some((com) => com.name === pokemon.name)
                ? styles.com
                : styles.button
            }
          >
            {comparison.some((com) => com.name === pokemon.name)
              ? "Remove from Comparison"
              : "Add to Comparison"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourite(pokemon);
            }}
            className={
              favourites.some((fav) => fav.name === pokemon.name)
                ? styles.fav
                : styles.button
            }
          >
            {favourites.some((fav) => fav.name === pokemon.name)
              ? "Remove from Favourites"
              : "Add to Favourites"}
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

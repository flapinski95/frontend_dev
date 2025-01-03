async function fetchDataList(limit = 50, type = "") {
  const url = type
    ? `https://pokeapi.co/api/v2/type/${type}` // Jeśli typ jest ustawiony, pobieraj Pokémony według typu
    : `https://pokeapi.co/api/v2/pokemon?limit=${limit}`; // Jeśli typ nie jest ustawiony, pobieraj wszystkie Pokémony

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    if (type) {
      // Przetwarzanie danych dla filtrowania po typach
      return json.pokemon.map((entry) => entry.pokemon).slice(0, limit); // Zwracamy listę `{ name, url }`
    } else {
      // Przetwarzanie danych dla wszystkich Pokémonów
      return json.results || []; // Zwracamy listę `{ name, url }`
    }
  } catch (error) {
    console.error(`Błąd API: ${error.message}`);
    return []; // Zwracamy pustą listę, jeśli wystąpił błąd
  }
}

async function fetchPokemonDetails(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export { fetchDataList, fetchPokemonDetails };

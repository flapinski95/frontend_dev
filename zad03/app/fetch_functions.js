async function fetchDataList(limit = 50) {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error(error.message);
    return [];
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

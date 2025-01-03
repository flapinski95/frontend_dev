async function getDataList() {
  const url = "https://pokeapi.co/api/v2/pokemon";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displayDataList(json.results);
  } catch (error) {
    console.error(error.message);
  }
}

async function getDataPoke(pokemon) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    displayDataPoke(json);
  } catch (error) {
    console.error(error.message);
  }
}

function displayDataList(data) {
  const displayContainer = document.getElementById("list");
  displayContainer.innerHTML = "";

  data.map((obj, index) => {
    const pokemonId = index + 1; //
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemonId}.png`;

    const dataItem = document.createElement("div");
    dataItem.classList.add("poke-data");

    const image = document.createElement("img");
    image.src = spriteUrl;
    image.alt = `Shiny sprite of ${obj.name}`;
    image.style.width = "50px";

    const text = document.createElement("span");
    text.textContent = ` ${pokemonId}. ${obj.name}`;
    dataItem.appendChild(image);
    dataItem.appendChild(text);

    dataItem.onclick = () => getDataPoke(obj.name);

    displayContainer.appendChild(dataItem);
  });
}

function displayDataPoke(data) {
  const displayContainer = document.getElementById("traits");
  displayContainer.innerHTML = "";

  const name = document.createElement("h2");
  name.textContent = `Name: ${data.name}`;
  displayContainer.appendChild(name);

  const typesContainer = document.createElement("div");
  typesContainer.classList.add("poke-stats");
  typesContainer.innerHTML = "<h3>Types:</h3>";
  data.types.map((item) => {
    const type = document.createElement("span");
    type.textContent = item.type.name;
    type.style.marginRight = "10px";
    typesContainer.appendChild(type);
  });
  displayContainer.appendChild(typesContainer);

  const statsContainer = document.createElement("div");
  statsContainer.classList.add("poke-stats");

  statsContainer.innerHTML = "<h3>Base Stats:</h3>";
  data.stats.map((stat) => {
    const statElement = document.createElement("p");
    statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsContainer.appendChild(statElement);
  });
  displayContainer.appendChild(statsContainer);

  const physicalAttributes = document.createElement("div");
  physicalAttributes.innerHTML = `
      <h3>Physical Attributes:</h3>
      <p>Height: ${data.height} decimeters</p>
      <p>Weight: ${data.weight} hectograms</p>
    `;
  physicalAttributes.classList.add("poke-stats");

  displayContainer.appendChild(physicalAttributes);
}

getDataList();

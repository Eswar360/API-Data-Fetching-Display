document.getElementById("searchBtn").addEventListener("click", getPokemon);

async function getPokemon() {
  const name = document.getElementById("pokemonName").value.toLowerCase();
  const info = document.getElementById("pokemonInfo");

  if (!name) {
    info.innerHTML = "<p>Please enter a Pokémon name.</p>";
    return;
  }

  info.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error("Pokémon not found");

    const data = await response.json();

    info.innerHTML = `
      <div class="pokemon-card">
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <h2>${data.name.toUpperCase()}</h2>
        <p><strong>Type:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Base Experience:</strong> ${data.base_experience}</p>
      </div>
    `;
  } catch (error) {
    info.innerHTML = "<p>❌ Pokémon not found! Try again.</p>";
  }
}

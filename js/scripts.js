let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison']
    },
    {
      name: 'Charmander',
      height: 0.6,
      types: ['fire']
    },
    {
      name: 'Squirtle',
      height: 0.5,
      types: ['water']
    },
    {
      name: 'Ekans',
      height: 2,
      types:['poison']
    }
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  
  return {
    getAll,
    add
  }
})();


// we iterate through the pokemonList array displaying each objects name and height in a HTML paragraph element with the class "pokemon-card".
// if a pokemons height is larger than 1, the string "- Wow, that's big!" will be added at the end
function myLoopFunction(pokemon) {
  if (pokemon.height > 1) {
    document.write(`<p class="pokemon-card">${pokemon.name} (height: ${pokemon.height}) - Wow, that's big!</p>`);
  } else {
    document.write(`<p class="pokemon-card">${pokemon.name} (height: ${pokemon.height})</p>`);
  }
}

pokemonRepository.getAll().forEach(myLoopFunction);
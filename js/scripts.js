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
    if ((typeof pokemon === object) && (Object.keys(pokemon) === ['name', 'height', 'types'])) {
      pokemonList.push(pokemon)
    } else {
      alert('Entry not valid!');
    }
  }

  function addListItem(pokemon) {
    // grabbing elements
    let ul = document.querySelector('.pokemon-list');

    // creating elements
    let li = document.createElement('li');
    let button = document.createElement('button');

    // customizing elements
    button.innerText = pokemon.name;
    button.classList.add('pkm-btn');
    li.classList.add('pokemon-list__item');

    // appending elements
    li.appendChild(button);
    ul.appendChild(li);
  }
  
  return {
    getAll,
    add,
    addListItem
  }
})();

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.getAll().forEach(myLoopFunction);

// this function allows the user to search for a specific pokemon in the pokemonRepository
function searchPokemon(userInput) {
  let resultArray = pokemonRepository.getAll().filter(pokemon => pokemon.name === userInput);
  let pokemonName = resultArray[0].name;
  return `<p class="search-result">${pokemonName}</p>`
}

console.log(searchPokemon('Charmander'));
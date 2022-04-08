let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if ((typeof pokemon === 'object') && ('name', 'detailsUrl' in pokemon)) {
      pokemonList.push(pokemon)
    } else {
      alert('Entry not valid!');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  // event listeners for addListItem()
  function buttonListener(button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
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

    // calling event listeners
    buttonListener(button, pokemon);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    })
  }

  function showLoadingMessage() {
    let loadingElement = document.querySelector('.loading-page');
    loadingElement.classList.remove('hidden');
  }

  function hideLoadingMessage() {
    let loadingElement = document.querySelector('.loading-page');
    loadingElement.classList.add('hidden');
  }
  
  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails
  }
})();

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(myLoopFunction);
})

// this function allows the user to search for a specific pokemon in the pokemonRepository
function searchPokemon(userInput) {
  let resultArray = pokemonRepository.getAll().filter(pokemon => pokemon.name === userInput);
  let pokemonName = resultArray[0].name;
  return `<p class="search-result">${pokemonName}</p>`
}

console.log(searchPokemon('Charmander'));
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
      showModal(pokemon.name, pokemon.height, pokemon.types, pokemon.imageUrl);
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
    let ul = document.querySelector('.list-group');

    // creating elements
    let li = document.createElement('li');
    let button = document.createElement('button');

    // customizing elements
    function capitalizeFirstLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    let pokemonName = capitalizeFirstLetter(pokemon.name);

    button.innerText = pokemonName;
    button.classList.add('btn btn-outline-dark pkm-btn');
    $(button).attr('type', 'button');
    
    li.classList.add('list-group-item col-lg-3 col-md-4 col-sm-6');

    // appending elements
    li.appendChild(button);
    ul.appendChild(li);

    // calling event listeners
    buttonListener(button, pokemon);
  }

    // modal start
    let modalContainer = document.querySelector('#modal-container');

    function showModal(name, height, types, imageUrl) {
      function capitalizeFirstLetter(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
      }
  
      let heightInMeters = height / 10;
      let pokemonName = capitalizeFirstLetter(name);
  
      modalContainer.innerHTML = '';
  
      let modal = document.createElement('div');
      modal.classList.add('modal');
  
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
  
      let imageElement = document.createElement('img');
      imageElement.src = imageUrl;
  
      let nameElement = document.createElement('h1');
      nameElement.innerText = pokemonName;
  
      let heightElement = document.createElement('p');
      heightElement.innerText = `${heightInMeters} m`;
      
      let typesBox = document.createElement('div');
      typesBox.classList.add('pokemon-types');
  
      modal.appendChild(closeButtonElement);
      types.forEach((type, index) => {
        if (index === types.length -1) {
          let typesFirstElement = document.createElement('span');
          typesFirstElement.classList.add('first-type');
          typesFirstElement.innerText = type.type.name.toUpperCase();
          typesBox.appendChild(typesFirstElement);
          modal.appendChild(typesBox);
        } else {
          let typesSecondElement = document.createElement('span');
          typesSecondElement.classList.add('second-type');
          typesSecondElement.innerText = type.type.name.toUpperCase();
          typesBox.appendChild(typesSecondElement);
          modal.appendChild(typesBox);
        }
      });
      modal.appendChild(imageElement);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modalContainer.appendChild(modal);
  
      modalContainer.classList.add('is-visible');
    }
  
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }
  
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
  
    modalContainer.addEventListener('click', (event) => {
      let target = event.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
    // modal end

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
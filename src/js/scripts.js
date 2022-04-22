let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && ('name', 'detailsUrl' in pokemon)) {
      pokemonList.push(pokemon);
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
    $(button).addClass('pkm-btn btn');
    $(button).attr('type', 'button');
    $(button).attr('data-toggle', 'modal');
    $(button).attr('data-target', '#pokemonModal');

    $(li).addClass('list-group-item col-xl-3 col-lg-4 col-sm-6');

    // appending elements
    li.appendChild(button);
    ul.appendChild(li);

    // calling event listeners
    buttonListener(button, pokemon);
  }

  // MODAL START
  function showModal(name, height, types, imageUrl) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();

    function capitalizeFirstLetter(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    let heightInMeters = height / 10;
    let pokemonName = capitalizeFirstLetter(name);

    let closeModeBtn = $(
      `<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>`
    );
    let typesBox = $(`<div class="pokemon-types"></div>`);

    let imageElement = $(`<img class="modal-image">`);
    imageElement.attr('src', imageUrl);
    let nameElement = $(`<h1>${pokemonName}</h1>`);
    let heightElement = $(`<p>${heightInMeters} m</p>`);

    types.forEach((type, index) => {
      if (index === types.length - 1) {
        let typesFirstElement = $(
          `<span class="first-type">${type.type.name.toUpperCase()}</span>`
        );
        typesBox.append(typesFirstElement);
        modalHeader.append(typesBox);
      } else {
        let typesSecondElement = $(
          `<span class="second-type">${type.type.name.toUpperCase()}</span>`
        );
        typesBox.append(typesSecondElement);
        modalHeader.append(typesBox);
      }
    });
    modalHeader.append(closeModeBtn);

    modalTitle.append(nameElement);
    modalBody.append(modalTitle);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
  }
  // MODAL END

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showLoadingMessage() {
    let loadingElement = document.querySelector('.loading-page');
    loadingElement.classList.remove('hidden');
  }

  function hideLoadingMessage() {
    let loadingElement = document.querySelector('.loading-page');
    loadingElement.classList.add('hidden');
  }

  function search(e) {
    const key = e.target.value.toLowerCase();
    if (key.length > 2) {
      const pokemonList = document.querySelectorAll('.list-group > li');
      pokemonList.forEach((l) => {
        if (l.innerText.toLowerCase().includes(key)) {
          l.style.display = 'block';
          console.log(l.innerText, 'Matches');
        } else {
          l.style.display = 'none';
        }
      });
    } else if (key.length === 0) {
      window.location.reload();
    }
  }

  return {
    add,
    getAll,
    addListItem,
    loadList,
    loadDetails,
    search,
  };
})();

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('input', pokemonRepository.search);
searchBtn.addEventListener('search', function (e) {
  window.location.reload();
});

function myLoopFunction(pokemon) {
  pokemonRepository.addListItem(pokemon);
}

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(myLoopFunction);
});

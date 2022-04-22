let pokemonRepository = (function () {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(t) {
    'object' == typeof t && 'detailsUrl' in t
      ? e.push(t)
      : alert('Entry not valid!');
  }
  function o(e) {
    a(e).then(function () {
      !(function (e, t, n, o) {
        let a = $('.modal-body'),
          l = $('.modal-title'),
          i = $('.modal-header');
        l.empty(), a.empty(), i.empty();
        let s = t / 10,
          r = (function (e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
          })(e),
          c = $(
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
          ),
          p = $('<div class="pokemon-types"></div>'),
          d = $('<img class="modal-image">');
        d.attr('src', o);
        let u = $(`<h1>${r}</h1>`),
          m = $(`<p>${s} m</p>`);
        n.forEach((e, t) => {
          if (t === n.length - 1) {
            let t = $(
              `<span class="first-type">${e.type.name.toUpperCase()}</span>`
            );
            p.append(t), i.append(p);
          } else {
            let t = $(
              `<span class="second-type">${e.type.name.toUpperCase()}</span>`
            );
            p.append(t), i.append(p);
          }
        }),
          i.append(c),
          l.append(u),
          a.append(l),
          a.append(d),
          a.append(m);
      })(e.name, e.height, e.types, e.imageUrl);
    });
  }
  function a(e) {
    l();
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        i(),
          (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function (e) {
        i(), console.error(e);
      });
  }
  function l() {
    document.querySelector('.loading-page').classList.remove('hidden');
  }
  function i() {
    document.querySelector('.loading-page').classList.add('hidden');
  }
  return {
    add: n,
    getAll: function () {
      return e;
    },
    addListItem: function (e) {
      let t = document.querySelector('.list-group'),
        n = document.createElement('li'),
        a = document.createElement('button'),
        l = (i = e.name).charAt(0).toUpperCase() + i.slice(1);
      var i;
      (a.innerText = l),
        $(a).addClass('pkm-btn btn'),
        $(a).attr('type', 'button'),
        $(a).attr('data-toggle', 'modal'),
        $(a).attr('data-target', '#pokemonModal'),
        $(n).addClass('list-group-item col-xl-3 col-lg-4 col-sm-6'),
        n.appendChild(a),
        t.appendChild(n),
        (function (e, t) {
          e.addEventListener('click', function () {
            o(t);
          });
        })(a, e);
    },
    loadList: function () {
      return (
        l(),
        fetch(t)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            i(),
              e.results.forEach(function (e) {
                n({ name: e.name, detailsUrl: e.url });
              });
          })
          .catch(function (e) {
            i(), console.error(e);
          })
      );
    },
    loadDetails: a,
    search: function (e) {
      const t = e.target.value.toLowerCase();
      t.length > 2
        ? document.querySelectorAll('.list-group > li').forEach((e) => {
            e.innerText.toLowerCase().includes(t)
              ? ((e.style.display = 'block'),
                console.log(e.innerText, 'Matches'))
              : (e.style.display = 'none');
          })
        : 0 === t.length && window.location.reload();
    },
  };
})();
const searchBtn = document.getElementById('searchBtn');
function myLoopFunction(e) {
  pokemonRepository.addListItem(e);
}
searchBtn.addEventListener('input', pokemonRepository.search),
  searchBtn.addEventListener('search', function (e) {
    window.location.reload();
  }),
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(myLoopFunction);
  });

let pokemonRepository = (function () {
  let e = [],
    t = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(t) {
    'object' == typeof t && 'detailsUrl' in t
      ? e.push(t)
      : alert('Entry not valid!');
  }
  function o(e) {
    l(e).then(function () {
      !(function (e, t, n, o) {
        let a = $('.modal-body'),
          l = $('.modal-title'),
          r = $('.modal-header');
        l.empty(), a.empty(), r.empty();
        let c = t / 10,
          i = (function (e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
          })(e),
          p = $(
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
          ),
          s = $('<div class="pokemon-types"></div>'),
          d = $('<img class="modal-image">');
        d.attr('src', o);
        let m = $(`<h1>${i}</h1>`),
          u = $(`<p>${c} m</p>`);
        n.forEach((e, t) => {
          if (t === n.length - 1) {
            let t = $(
              `<span class="first-type">${e.type.name.toUpperCase()}</span>`
            );
            s.append(t), r.append(s);
          } else {
            let t = $(
              `<span class="second-type">${e.type.name.toUpperCase()}</span>`
            );
            s.append(t), r.append(s);
          }
        }),
          r.append(p),
          l.append(m),
          a.append(l),
          a.append(d),
          a.append(u);
      })(e.name, e.height, e.types, e.imageUrl);
    });
  }
  function a(e) {
    let t = document.querySelector('.list-group'),
      n = document.createElement('li'),
      a = document.createElement('button');
    let l = (r = e.name).charAt(0).toUpperCase() + r.slice(1);
    var r;
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
  }
  function l(e) {
    r();
    let t = e.detailsUrl;
    return fetch(t)
      .then(function (e) {
        return e.json();
      })
      .then(function (t) {
        c(),
          (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types);
      })
      .catch(function (e) {
        c(), console.error(e);
      });
  }
  function r() {
    document.querySelector('.loading-page').classList.remove('hidden');
  }
  function c() {
    document.querySelector('.loading-page').classList.add('hidden');
  }
  return {
    add: n,
    getAll: function () {
      return e;
    },
    addListItem: a,
    loadList: function () {
      return (
        r(),
        fetch(t)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            c(),
              e.results.forEach(function (e) {
                n({ name: e.name, detailsUrl: e.url });
              });
          })
          .catch(function (e) {
            c(), console.error(e);
          })
      );
    },
    loadDetails: l,
    searchPokemon: function (t) {
      function n(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }
      if (($('.list-group').empty(), t.length >= 1)) {
        t.toLowerCase();
        let o = n(t);
        console.log(o);
        let l = e.filter(
          (e) =>
            n(e.name).charAt(0) === o ||
            n(e.name).charAt(0) + n(e.name).charAt(1) === o ||
            n(e.name).charAt(0) + n(e.name).charAt(1) + n(e.name).charAt(2) ===
              o ||
            n(e.name).charAt(0) +
              n(e.name).charAt(1) +
              n(e.name).charAt(2) +
              n(e.name).charAt(3) ===
              o ||
            n(e.name) === o
        );
        console.log(l), l.forEach((e) => a(e));
      }
    },
  };
})();
function myLoopFunction(e) {
  pokemonRepository.addListItem(e);
}
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(myLoopFunction);
});

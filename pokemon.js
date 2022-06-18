

fetchPokemons('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1126')

function fetchPokemons (url) {
  fetch(url)
    .then(respone => respone.json()).then(data => {
      data.results.forEach(pokemon => {
        createNewOption(pokemon.name)
      })
    })
}

const pokeDataList = document.getElementById('pokemons')

function createNewOption (name) {
  const newOpiton = document.createElement('option')
  newOpiton.value = name

  pokeDataList.appendChild(newOpiton)
}





const input = document.getElementById('pokemon-input')
const pokeCard = document.getElementById('poke-card')

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') searchPokemon()
})

function searchPokemon () {
  const pokemonName = input.value

  const fetchUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

  fetch(fetchUrl)
    .then(response => response.json())
    .then(data => {
      createPokeCard(data)
      const descriptionUrl = `https://pokeapi.co/api/v2/characteristic/${data.id}`
      fetch(descriptionUrl)
        .then(response => response.json())
        .then(data => {
          const description = data.descriptions[7].description
          addDescriptionRow(description)
        })
    })
}

function createPokeCard (data) {
  pokeCard.innerHTML = ''

  const pokeImg = createImage(data.sprites.other.dream_world.front_default)
  const pokeStats = createStatsTable(data)

  pokeCard.appendChild(pokeImg)
  pokeCard.appendChild(pokeStats)
}

function createImage (imageSrc) {
  const pokeImg = document.createElement('img')
  pokeImg.src = imageSrc
  return pokeImg
}

function createStatsTable (data) {
  const name = data.name
  const height = data.height
  const weight = data.weight
  const types = data.types

  const table = document.createElement('table')
  table.id = 'table'
  const thead = document.createElement('thead')
  const nameRow = createNameRow(name)

  thead.appendChild(nameRow)
  table.appendChild(thead)

  const tbody = createtbody(height, weight, types)
  table.appendChild(tbody)

  return table
}

function createNameRow (name) {
  const tr = document.createElement('tr')
  const th = document.createElement('th')

  th.colSpan = 2
  name = capitalaziWord(name)
  th.textContent = name

  tr.appendChild(th)

  return tr
}

function createtbody (height, weight, types) {
  const tbody = document.createElement('tbody')

  const textTypes = []
  for (let index = 0; index < types.length; index++) {
    const type = types[index]

    let name = type.type.name
    if (index === 0) name = capitalaziWord(name)
    if (index > 0) name = ' ' + name

    textTypes.push(name)
  }

  const trTypes = createBodyRow('Types', textTypes.toString())
  const trHeight = createBodyRow('Height', height)
  const trWeight = createBodyRow('Weight', weight)

  tbody.appendChild(trTypes)
  tbody.appendChild(trHeight)
  tbody.appendChild(trWeight)
  return tbody
}

function createBodyRow (headerText, content) {
  const tr = document.createElement('tr')
  const th = document.createElement('th')
  const td = document.createElement('td')
  th.textContent = headerText
  td.textContent = content

  tr.appendChild(th)
  tr.appendChild(td)

  return tr
}

function capitalaziWord (word) {
  if (word == undefined) return
  if (word.length < 2) return word[0].toUpperCase()

  return word[0].toUpperCase() + word.substring(1)
}

function addDescriptionRow (description) {
  const tfoot = document.createElement('tfoot')
  const tr = document.createElement('tr')
  const td = document.createElement('td')
  td.colSpan = 2
  td.textContent = description

  tr.appendChild(td)
  tfoot.appendChild(tr)

  const table = document.getElementById('table')

  table.appendChild(tfoot)
}

/*
  <tfoot>
    <tr>
      <td colspan="2">
        Description
      </td>
    </tr>
</tfoot>
*/
const axios = require('axios')
const { limit, urlApi, logDBload } = require('../../config.js')
const { Pokemons, Types } = require('../db.js')
const { Op } = require('sequelize')

const pokemonsLoader = async () => {
  const pokemonlist = await Pokemons.findAndCountAll()
  if (pokemonlist.count === 0) {
    try {
      const response = await axios.get(`${urlApi}/pokemon/`)
      let next = response.data.next
      let pokemonsFromApi = response.data.results

      // Trae tantos Pokemons desde la Api como se requieran en 'limit' de config.js
      while (pokemonsFromApi.length < limit) {
        const newresponse = await axios.get(next)
        next = newresponse.data.next
        pokemonsFromApi = pokemonsFromApi.concat(newresponse.data.results)
      }

      console.log(' ■'.green, 'Fetched', 'Pokemons'.magenta, 'from Api: ', pokemonsFromApi.length)
      console.log('  (if you want more, change "limit" from config.js)'.gray)
      console.log(' ■'.green, 'Loading Pokemons', 'Table,'.magenta, 'please wait...')

      for (let i = 0; i < pokemonsFromApi.length; i++) {
        try {
          const pokemon = pokemonsFromApi[i]
          const response = await axios.get(pokemon.url)
          const { name, height, weight, stats, types } = response.data
          const img = response.data.sprites.other.dream_world.front_default
          let hp
          let attack
          let defense
          let speed

          stats.forEach(item => {
            if (item.stat.name === 'hp') hp = item.base_stat
            if (item.stat.name === 'attack') attack = item.base_stat
            if (item.stat.name === 'defense') defense = item.base_stat
            if (item.stat.name === 'speed') speed = item.base_stat
          })

          const newPokemon = await Pokemons.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img
          })

          if (logDBload) console.log('  ', i + 1, name, 'OK'.green)

          types.forEach(async item => {
            const getType = await Types.findOne({
              where: {
                name: {
                  [Op.eq]: item.type.name
                }
              }
            })
            newPokemon.addType(getType)
          })
        } catch (err) { console.log('  ', "ERROR getting Pokemon's details".red) }
      }
    } catch (error) {
      console.log(' ■'.red, 'ERROR'.inverse.red, 'loading', 'Pokemons DATABASE'.magenta)
    }
  } else {
    console.log(' ■'.green, 'Pokemons'.magenta, 'table has data... fetching Api skipped')
  }
}

module.exports = { pokemonsLoader }

const { Pokemons, Types } = require('../../db.js')
const { Op } = require('sequelize')

const pokemonsController = {

  getAll: async () => {
    const res = await Pokemons.findAll({
      order: [['id']],
      attributes: ['id', 'name', 'img', 'attack', 'category'],
      include: {
        model: Types,
        attributes: ['name']
      }
    })

    const response = []
    res.forEach(pokemon => {
      const types = []
      pokemon.dataValues.types.forEach(type => {
        types.push(type.dataValues.name)
      })
      pokemon = {
        id: pokemon.id,
        name: pokemon.name,
        img: pokemon.img,
        attack: pokemon.attack,
        category: pokemon.category,
        types
      }
      response.push(pokemon)
    })

    return response
  },

  getByName: async (name) => {
    try {
      const response = await Pokemons.findOne({
        where: { name },
        attributes: ['img', 'name', 'id', 'hp', 'attack', 'defense', 'speed', 'height', 'weight', 'category'],
        include: {
          model: Types,
          attributes: ['name']
        }
      })
      return response
    } catch (err) { return err }
  },

  getById: async (id) => {
    const response = await Pokemons.findByPk(id, {
      attributes: ['img', 'name', 'id', 'hp', 'attack', 'defense', 'speed', 'height', 'weight'],
      include: {
        model: Types,
        attributes: ['name']
      }
    })
    return response
  },

  addNew: async ({ name, hp, attack, defense, speed, height, weight, types }) => {
    const Pokename = name[0].toUpperCase() + name.substring(1)
    const random = Math.floor((Math.random() * 10) + 1)

    try {
      const newPokemon = await Pokemons.create({
        name: name.toLowerCase(),
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        category: 'custom',
        img: `/img/shadows/${random}.png`
      })

      await types.forEach(async type => {
        const newType = await Types.findOne({
          where: {
            name: {
              [Op.eq]: type
            }
          }
        })
        await newPokemon.addType(newType)
      })
      return (`Pokemon ${Pokename} was created`)
    } catch (err) { return err }
  },

  deletePokemon: async (name) => {
    const Pokename = name[0].toUpperCase() + name.substring(1)
    try {
      await Pokemons.destroy({
        where: { name }
      })
      return `Pokemon ${Pokename} has been deleted`
    } catch (err) { return err }
  },

  renamePokemon: async (oldName, newName) => {
    try {
      await Pokemons.update(
        { name: newName },
        { where: { name: oldName } }
      )
      return 'Pokemon renamed'
    } catch (err) { return err }
  }
}

module.exports = pokemonsController

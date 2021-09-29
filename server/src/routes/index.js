const { Router } = require('express')
const router = Router()
const pokemons = require('../components/pokemons/pokemonsNetwork')
const types = require('../components/types/typesNetwork')

router.use('/pokemons', pokemons)
router.use('/types', types)

module.exports = router

const express = require('express')
const router = express.Router()
const { getAll, getByName, getById, addNew, deletePokemon, renamePokemon } = require('./pokemonsController')

router.get('/', async (req, res) => {
  if (req.query.name) {
    res.json(await getByName(req.query.name))
  } else {
    res.json(await getAll())
  }
})

router.get('/:idPokemon', async (req, res) => {
  res.json(await getById(req.params.idPokemon))
})

router.post('/', async (req, res) => {
  const response = await addNew(req.body)
  res.send(response)
})

router.put('/rename', async (req, res) => {
  const response = await renamePokemon(req.body.oldName, req.body.newName)
  res.send(response)
})

router.delete('/delete/:name', async (req, res) => {
  const response = await deletePokemon(req.params.name)
  res.send(response)
})

module.exports = router

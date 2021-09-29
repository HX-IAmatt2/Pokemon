const express = require('express')
const router = express.Router()
const { getAll } = require('./typesController')

router.get('/', async (req, res) => {
  res.json(await getAll())
})

module.exports = router

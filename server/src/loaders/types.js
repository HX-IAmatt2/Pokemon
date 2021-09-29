const axios = require('axios')
const { urlApi } = require('../../config.js')
const { Types } = require('../db.js')

const typesLoader = async () => {
  const typeList = await Types.findAndCountAll()
  if (typeList.count === 0) {
    try {
      const response = await axios.get(`${urlApi}/type`)
      const typesFromApi = response.data.results

      await typesFromApi.forEach(type => {
        const name = type.name
        Types.create({ name })
      })

      console.log(' ■'.green, 'Fetched', 'Types'.magenta, 'from Api: ', typesFromApi.length)
    } catch (error) {
      console.log(' ■'.red, 'ERROR'.inverse.red, 'getting', 'Types'.magenta, 'from Api')
    }
  } else {
    console.log(' ■'.green, 'Types'.magenta, 'table has data... fetching Api skipped')
  }
}

module.exports = { typesLoader }

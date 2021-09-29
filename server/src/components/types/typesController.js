const { Types } = require('../../db.js')

const typesController = {
  getAll: async () => {
    const response = await Types.findAll({
      attributes: ['name']
    })

    const filtred = response.filter(type => type.name !== 'unknown' && type.name !== 'shadow')
    return filtred.map(type => type.name).sort()
  }
}

module.exports = typesController

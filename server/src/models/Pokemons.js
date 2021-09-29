const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('pokemons', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER
    },
    attack: {
      type: DataTypes.INTEGER
    },
    defense: {
      type: DataTypes.INTEGER
    },
    speed: {
      type: DataTypes.INTEGER
    },
    height: {
      type: DataTypes.INTEGER
    },
    weight: {
      type: DataTypes.INTEGER
    },
    img: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.ENUM('original', 'custom'),
      defaultValue: 'original'
    }
  })
}

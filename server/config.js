
const config = {
  urlApi: 'https://pokeapi.co/api/v2/',
  limit: 200, // Cantidad de Pokemons que quiero cargar inicialmente desde la Api externa. Incrementa de a 20.
  force: false,
  logDBload: true // Establece si consologuear la correcta carga de cada Pokemon
}

module.exports = config

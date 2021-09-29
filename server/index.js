//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
require('colors')
const { typesLoader } = require('./src/loaders/types')
const { pokemonsLoader } = require('./src/loaders/pokemons')

const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const { force } = require('./config.js')
// const { PORT, HOST } = process.env
const PORT = process.env.PORT || 3001

// Syncing all the models at once.
const runServer = async () => {
  try {
    await conn.sync({ force })
    process.stdout.write('\u001b[2J\u001b[0;0H') // borra estado anterior de la consola
    console.log('')
    console.log(' ■'.green, 'Database', 'SYNC OK'.green)
  } catch (error) {
    console.log(error)
  }
  await typesLoader() // carga el modelo Type con los tipos de la Api
  await pokemonsLoader() // carga el modelo Pokemon con los pokemones de la Api
  console.log(' ■'.green, 'ALL DONE')

  server.listen(PORT, () => {
    console.log('')
    console.log(' ╔══════════════════════════════════════╗')
    console.log(' ║ ', 'PI-Pokemon Server'.inverse.yellow, 'listening at', PORT.magenta || '3001'.magenta, '║')
    console.log(' ╚══════════════════════════════════════╝')
    console.log('')
  })
}

runServer()

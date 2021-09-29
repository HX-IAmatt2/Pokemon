import { useSelector } from 'react-redux'
import Pokedex from '../Pokedex/pokedex'
import PokeLab from '../PokeLab/pokeLab'
import arrowL from '../../assets/img/arrowL.png'
import arrowR from '../../assets/img/arrowR.png'
import styles from './home.module.css'

function HomeView ({ typeList, options, lcdTxt, actualPage, prev, next, handleChange, openPokedex, filtredList, position, openPokeLab, found }) {
  const modal = useSelector((state) => state.modal)
  const screen = useSelector((state) => state.screen)

  return (
    <>
      {modal === 'Pokedex' ? <Pokedex /> : null}

      <div className={styles.tablet}>

        {/* DISPLAY SUPERIOR EN TABLET */}
        <div id={styles.topLCD}>
          {lcdTxt}
        </div>

        {/* PANTALLA DE TABLET */}
        <div id={styles.mainScreen}>
          {screen === 'Pokemon Lab' ? <PokeLab /> : null}

          {screen === 'Home'
            ? (
              <>
                {/* OPCIONES de FILTRADO */}
                <div className={styles.optionsDiv}>

                  {/* FILTRADO por TIPO */}
                  <div className={styles.option}>
                    <label>Type</label>
                    <select
                      value={options.type}
                      name='type'
                      key='type'
                      onChange={(event) => handleChange(event.target.name, event.target.value)}
                    >
                      <option value='all'>All</option>
                      {typeList.map((type, index) => {
                        const typeName = type[0].toUpperCase() + type.substring(1)
                        return <option key={index} value={type}>{typeName}</option>
                      })}
                    </select>
                  </div>

                  {/* FILTRADO por CATEGORIA */}
                  <div className={styles.option}>
                    <label>Category</label>
                    <select
                      value={options.cat}
                      name='cat'
                      key='cat'
                      onChange={(event) => handleChange(event.target.name, event.target.value)}
                    >
                      <option value='all'>All</option>
                      <option value='original'>Original</option>
                      <option value='custom'>Custom</option>
                    </select>
                  </div>

                  {/* OPCIONES de ORDENADO */}
                  <div className={styles.option}>
                    <label>Order by</label>
                    <div className={styles.orders}>
                      <select
                        className={styles.order}
                        value={options.order}
                        name='order'
                        key='order'
                        onChange={(event) => handleChange(event.target.name, event.target.value)}
                      >
                        <option value='id'>Id</option>
                        <option value='name'>Name</option>
                        <option value='attack'>Attack</option>
                      </select>
                      <select
                        className={styles.order}
                        value={options.direction}
                        name='direction'
                        key='direction'
                        onChange={(event) => handleChange(event.target.name, event.target.value)}
                      >
                        <option value='asc'>Ascending </option>
                        <option value='des'>Descending </option>
                      </select>
                    </div>
                  </div>

                  {/* FILTRADO por NOMBRE EXACTO */}
                  <div className={styles.option}>
                    <label>Name</label>
                    <input
                      id={styles.input}
                      type='text'
                      name='name'
                      key='name'
                      // value={options.findName}
                      onChange={(event) => handleChange(event.target.name, event.target.value)}
                    />
                  </div>

                  {/* NEW POKEMON */}
                  <div className={styles.option}>
                    <button id={styles.newPokemonButton} atl='' onClick={openPokeLab}>New Pokemon</button>
                  </div>

                </div>

                {/* GRID */}
                <div className={styles.grid}>
                  {actualPage.map((pokemon, index) => {
                    const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1)

                    return (
                      <div key={index} className={styles.cell} onClick={() => openPokedex(pokemon.name)}>
                        <div className={styles.typeDiv}>
                          {pokemon.types.map((type, index) => {
                            const typeName = type[0].toUpperCase() + type.substring(1)
                            return (
                              <img key={index} className={styles.typeIcon} src={`./img/types/${type}.png`} title={typeName} alt='' />
                            )
                          })}
                        </div>

                        <img className={styles.pokeImg} src={pokemon.img} alt='' />
                        <h6>{name}</h6>
                      </div>
                    )
                  }
                  )}

                </div>
              </>

              )
            : null}
        </div>
        {/* FLECHAS DE PAGINADO */}
        <div id={styles.bottomButtons}>
          <div className={styles.buttonDiv}>
            {filtredList.length > 9 && position > 0 && screen === 'Home' && !found
              ? <img className={styles.arrow} src={arrowL} alt='' onClick={() => prev()} />
              : <img className={styles.arrowDisabled} src={arrowL} alt='' />}
          </div>
          <div className={styles.buttonDiv}>
            {filtredList.length > 9 && position + 9 < filtredList.length && screen === 'Home' && !found
              ? <img className={styles.arrow} src={arrowR} alt='' onClick={() => next()} />
              : <img className={styles.arrowDisabled} src={arrowR} alt='' />}
          </div>
        </div>
      </div>

    </>
  )
}

export default HomeView

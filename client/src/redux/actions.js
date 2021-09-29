
export const setLogged = () => {
  return {
    type: 'SET_LOGGED',
    payload: true
  }
}

export const setScreen = (screen) => {
  return {
    type: 'SET_SCREEN',
    payload: screen
  }
}

export const setModal = (modal) => {
  return {
    type: 'SET_MODAL',
    payload: modal
  }
}

export const setLcdTxt = (txt) => {
  return {
    type: 'SET_LCD_TXT',
    payload: txt
  }
}

export const setPokemonList = (pokemonList) => {
  return {
    type: 'SET_POKEMON_LIST',
    payload: pokemonList
  }
}

export const setTypeList = (typeList) => {
  return {
    type: 'SET_TYPE_LIST',
    payload: typeList
  }
}

export const setDetailedPokemon = (pokemon) => {
  return {
    type: 'SET_DETAILED_POKEMON',
    payload: pokemon
  }
}

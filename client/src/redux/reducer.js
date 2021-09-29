const initialState = {
  logged: false,
  screen: 'Home',
  modal: '',
  lcdTxt: 'Welcome!',
  pokemonList: [],
  typeList: [],
  detailedPokemon: {}
}

const windowReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGGED':
      return { ...state, logged: true }

    case 'SET_SCREEN':
      return { ...state, screen: action.payload }

    case 'SET_MODAL':
      return { ...state, modal: action.payload }

    case 'SET_LCD_TXT':
      return { ...state, lcdTxt: action.payload }

    case 'SET_POKEMON_LIST':
      return { ...state, pokemonList: action.payload }

    case 'SET_TYPE_LIST':
      return { ...state, typeList: action.payload }

    case 'SET_DETAILED_POKEMON':
      return { ...state, detailedPokemon: action.payload }

    default:
      return state
  }
}

export default windowReducer

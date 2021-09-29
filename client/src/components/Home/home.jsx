import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setModal, setScreen, setDetailedPokemon, setLcdTxt } from '../../redux/actions'
import axios from 'axios'
import { host } from '../../config/keys.js'
import HomeView from './home.view'

const Home = () => {
  const dispatch = useDispatch()
  const lcdTxt = useSelector((state) => state.lcdTxt)
  const screen = useSelector((state) => state.screen)
  const pokemonList = useSelector((state) => state.pokemonList)
  const typeList = useSelector((state) => state.typeList)

  const [options, setOptions] = useState({
    type: 'all',
    cat: 'all',
    order: 'id',
    direction: 'asc',
    findName: ''
  })

  const [filtredList, setFiltredList] = useState(pokemonList)
  const [actualPage, setActualPage] = useState([])
  const [position, setPosition] = useState(0)
  const [found, setFound] = useState(false)

  useEffect(() => {
    let filtredByType
    let filtredByCat
    let ordererlist

    // FILTRA por TIPO
    if (options.type === 'all') {
      filtredByType = pokemonList
    } else {
      filtredByType = pokemonList.filter(pokemon => pokemon.types.includes(options.type))
    }

    // FILTRA por CATEGORIA
    if (options.cat === 'all') {
      filtredByCat = filtredByType
    } else {
      filtredByCat = filtredByType.filter(pokemon => pokemon.category === options.cat)
    }

    // ORDENA
    if (options.direction === 'asc') {
      ordererlist = filtredByCat.sort(function (a, b) {
        if (a[options.order] > b[options.order]) {
          return 1
        }
        if (a[options.order] < b[options.order]) {
          return -1
        }
        return 0
      })
    }
    if (options.direction === 'des') {
      ordererlist = filtredByCat.sort(function (a, b) {
        if (a[options.order] < b[options.order]) {
          return 1
        }
        if (a[options.order] > b[options.order]) {
          return -1
        }
        return 0
      })
    }

    setFiltredList(ordererlist)
    setActualPage(ordererlist.slice(position, position + 9))
    if (screen === 'Home') dispatch(setLcdTxt(`Listing ${filtredList.length} Pokemons`))
  }, [position, pokemonList, options.type, options.order, options.direction, options.cat, dispatch, filtredList.length, screen])

  const next = () => {
    setPosition(position + 9)
  }

  const prev = () => {
    setPosition(position - 9)
  }

  const handleChange = (event, value) => {
    // MANEJA LA BUSQUEDA POR NOMBRE
    if (event === 'name') {
      setOptions((prev) => ({ ...prev, findName: value }))
      const searchResult = pokemonList.filter(pokemon => pokemon.name === value.toLowerCase())
      if (searchResult.length > 0) {
        setActualPage(searchResult)
        setFound(true)
      } else {
        setActualPage(filtredList.slice(position, position + 9))
        setFound(false)
      }
    // MANEJA LAS OPCIONES DE FILTRADO
    } else {
      setOptions((prev) => ({ ...prev, [event]: value }))
      setPosition(0)
      setOptions((prev) => ({ ...prev, findName: '' }))
    }
  }

  const openPokedex = async (name) => {
    const response = await axios.get(`${host}/pokemons?name=${name}`)
    dispatch(setDetailedPokemon(response.data))
    dispatch(setModal('Pokedex'))
  }

  const openPokeLab = () => {
    dispatch(setLcdTxt('Welcome to Pokemon Lab'))
    dispatch(setScreen('Pokemon Lab'))
  }

  return (
    <HomeView options={options} lcdTxt={lcdTxt} actualPage={actualPage} prev={prev} next={next} handleChange={handleChange} openPokedex={openPokedex} filtredList={filtredList} position={position} openPokeLab={openPokeLab} found={found} typeList={typeList} />
  )
}

export default Home

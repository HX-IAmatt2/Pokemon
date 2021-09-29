import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal, setPokemonList } from '../../redux/actions'
import axios from 'axios'
import { host } from '../../config/keys.js'
import PokedexView from './pokedex.view'

const Pokedex = () => {
  const dispatch = useDispatch()
  const pokemonList = useSelector((state) => state.pokemonList)
  const detailedPokemon = useSelector((state) => state.detailedPokemon)
  const [newName, setNewName] = useState({
    name: detailedPokemon.name[0].toUpperCase() + detailedPokemon.name.substring(1).toLowerCase(),
    error: true
  })

  const [screenMode, setScreenMode] = useState({
    status: false,
    msg: ''
  })

  const closePokedex = () => {
    dispatch(setModal(''))
  }

  const deletePokemon = async (name) => {
    const response = await axios.delete(`${host}/pokemons/delete/${name}`)
    setScreenMode(prev => ({ ...prev, msg: response.data }))
    const allPokemons = await axios.get(`${host}/pokemons`)
    dispatch(setPokemonList(allPokemons.data))
    setScreenMode(prev => ({ ...prev, status: 'deleted' }))
    setTimeout(
      () => dispatch(setModal(''))
      ,
      3000
    )
  }

  const handleNameChange = (value) => {
    setNewName(prev => ({ ...prev, error: '' }))
    const nameformat = /^[a-zA-Z]{1,12}$/

    if (pokemonList.find(pokemon => pokemon.name === value.toLowerCase())) {
      const formatedValue = value[0].toUpperCase() + value.substring(1).toLowerCase()
      setNewName(prev => ({ ...prev, error: `Pokemon ${formatedValue} already exists` }))
    } else if (value.length > 0 && value.length < 3) {
      const formatedValue = value[0].toUpperCase() + value.substring(1).toLowerCase()
      setNewName(prev => ({ ...prev, error: `${formatedValue} is too short` }))
    } else if (!value) {
      setNewName(prev => ({ ...prev, error: 'Your Pokemon must have a name' }))
    } else if (!value.match(nameformat)) {
      setNewName(prev => ({ ...prev, error: 'Alphabet characters only please' }))
    }
    setNewName(prev => ({ ...prev, name: value }))
  }

  const renamePokemon = async (oldName) => {
    const response = await axios.put(`${host}/pokemons/rename/`,
      {
        oldName,
        newName: newName.name
      })
    setScreenMode(prev => ({ ...prev, msg: response.data }))
    setScreenMode(prev => ({ ...prev, status: 'deleted' }))
    const allPokemons = await axios.get(`${host}/pokemons`)
    dispatch(setPokemonList(allPokemons.data))
    setTimeout(
      () => dispatch(setModal(''))
      ,
      3000
    )
  }

  return (
    <PokedexView closePokedex={closePokedex} detailedPokemon={detailedPokemon} deletePokemon={deletePokemon} renamePokemon={renamePokemon} screenMode={screenMode} setScreenMode={setScreenMode} newName={newName} handleNameChange={handleNameChange} />
  )
}

export default Pokedex

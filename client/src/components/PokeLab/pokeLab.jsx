import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setScreen, setLcdTxt, setPokemonList } from '../../redux/actions'
import axios from 'axios'
import { host } from '../../config/keys.js'
import PokeLabView from './pokeLab.view'

const PokeLab = () => {
  const dispatch = useDispatch()
  const pokemonList = useSelector((state) => state.pokemonList)
  const typeList = useSelector((state) => state.typeList)

  const [form, setForm] = useState({
    name: '',
    hp: '',
    speed: '',
    attack: '',
    defense: '',
    height: '',
    weight: '',
    types: []
  })

  const [error, setError] = useState({
    name: true,
    hp: true,
    speed: true,
    attack: true,
    defense: true,
    height: true,
    weight: true,
    types: true,
    points: true
  })

  const [validate, setValidate] = useState(false)
  const [done, setDone] = useState('')

  useEffect(() => {
    setValidate(true)
    if (error.name || error.hp || error.speed || error.attack || error.defense || error.height || error.weight || error.points || form.types.length === 0) {
      setValidate(false)
    }
  }, [error, form.types.length, dispatch])

  useEffect(() => {
    if (parseInt(form.hp) + parseInt(form.speed) + parseInt(form.attack) + parseInt(form.defense) > 255) setError(prev => ({ ...prev, points: 'wrong' }))
    else setError(prev => ({ ...prev, points: false }))
  }, [form.hp, form.speed, form.attack, form.defense])

  const backToHome = () => {
    dispatch(setScreen('Home'))
  }


  const handleNameChange = (value) => {
    setError(prev => ({ ...prev, name: '' }))
    const nameformat = /^[a-zA-Z]{1,12}$/

    if (pokemonList.find(pokemon => pokemon.name === value.toLowerCase())) {
      const formatedValue = value[0].toUpperCase() + value.substring(1).toLowerCase()
      dispatch(setLcdTxt(`Pokemon ${formatedValue} already exists`))
      setError(prev => ({ ...prev, name: 'wrong' }))
    } else if (value.length > 0 && value.length < 3) {
      const formatedValue = value[0].toUpperCase() + value.substring(1).toLowerCase()
      dispatch(setLcdTxt(`${formatedValue} is too short`))
      setError(prev => ({ ...prev, name: 'wrong' }))
    } else if (!value) {
      dispatch(setLcdTxt('Your Pokemon must have a name'))
      setError(prev => ({ ...prev, name: 'wrong' }))
    } else if (!value.match(nameformat)) {
      dispatch(setLcdTxt('Alphabet characters only please'))
      setError(prev => ({ ...prev, name: 'wrong' }))
    } else {
      dispatch(setLcdTxt('Name is OK'))
    }
    setForm(prev => ({ ...prev, name: value }))
  }

  const handleChange = (event, value) => {
    dispatch(setLcdTxt(''))
    const eventName = event[0].toUpperCase() + event.substring(1)
    setError(prev => ({ ...prev, [event]: '' }))

    if (value < 1) {
      dispatch(setLcdTxt(`${eventName} value is too low`))
      setError(prev => ({ ...prev, [event]: 'wrong' }))
    }
    if (!value) {
      dispatch(setLcdTxt(`Complete ${eventName} please`))
      setError(prev => ({ ...prev, [event]: 'wrong' }))
    }
    setForm(prev => ({ ...prev, [event]: value }))
  }

  const handleCheckboxChange = (event) => {
    dispatch(setLcdTxt(''))
    setError(prev => ({ ...prev, types: '' }))
    let newArray = [...form.types, event.target.id]
    if (form.types.includes(event.target.id)) {
      newArray = newArray.filter(type => type !== event.target.id)
    }
    if (newArray.length === 2) dispatch(setLcdTxt('Maximum types reached'))
    setForm(prev => ({ ...prev, types: newArray }))
    if (newArray.length === 0) {
      if (form.name) dispatch(setLcdTxt(`${form.name} needs 1 type at least`))
      else dispatch(setLcdTxt('A Pokemon needs 1 type at least'))
      setError(prev => ({ ...prev, types: 'wrong' }))
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${host}/pokemons/`,
        {
          name: form.name,
          hp: form.hp,
          attack: form.attack,
          defense: form.defense,
          speed: form.speed,
          height: form.height,
          weight: form.weight,
          types: form.types
        })
      setDone(res.data)
    } catch (error) {
      setDone(error.response.data)
    }
    await setTimeout(
      () => setValidate(true), 2500) // solo para hacer tiempo
    const allPokemons = await axios.get(`${host}/pokemons`)
    dispatch(setPokemonList(allPokemons.data))
    setTimeout(
      () => dispatch(setScreen('Home')), 1000)
  }

  return (
    <PokeLabView form={form} done={done} handleCheckboxChange={handleCheckboxChange} handleNameChange={handleNameChange} backToHome={backToHome} handleChange={handleChange} handleSubmit={handleSubmit} validate={validate} typeList={typeList} error={error} />
  )
}

export default PokeLab

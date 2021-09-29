import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogged, setPokemonList, setTypeList } from '../../redux/actions'
import axios from 'axios'
import { host } from '../../config/keys.js'
import LandingView from './landing.view'

const Landing = () => {
  const dispatch = useDispatch()
  const logged = useSelector((state) => state.logged)

  const [resolve, setResolve] = useState({
    success: false,
    error: false
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPokemons = await axios.get(`${host}/pokemons`)
        dispatch(setPokemonList(allPokemons.data))
        const allTypes = await axios.get(`${host}/types`)
        dispatch(setTypeList(allTypes.data))

        setTimeout(
          () => setResolve(prev => ({ ...prev, success: true })),
          3000
        )
      } catch (e) {
        setResolve(prev => ({ ...prev, error: 'Server down... try again later' }))
      }
    }
    fetchData()
  }, [dispatch])

  const login = () => {
    dispatch(setLogged())
  }

  return !logged ? <LandingView login={login} resolve={resolve} /> : null
}

export default Landing

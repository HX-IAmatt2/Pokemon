import { useSelector } from 'react-redux'
import Home from './components/Home/home'
import Landing from './components/Landing/landing'

const App = () => {
  const logged = useSelector((state) => state.logged)

  return logged ? <Home /> : <Landing />
}

export default App

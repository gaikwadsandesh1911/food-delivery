import Header from '../../components/Header/Header'
import Menus from '../../components/Menus/Menus'
import {useState} from 'react'
import './home.css'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <Menus category={category} setCategory={setCategory}/>
    </div>
  )
  
}

export default Home
import Header from '../../components/Header/Header'
import Menus from '../../components/Menus/Menus'
import {useState} from 'react'
import './home.css'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {

  const [category, setCategory] = useState("All");
  
  return (
    <div>
      <Header/>
      <Menus category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
  
}

export default Home
import Header from "../../components/Header/Header";
import Menus from "../../components/Menus/Menus";
import "./home.css";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import { useEffect } from "react";

const Home = () => {

  // when this page is refreshed, it start from top
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div>
      <Header />
      <Menus/>
      <FoodDisplay/>
    </div>
  );
};

export default Home;

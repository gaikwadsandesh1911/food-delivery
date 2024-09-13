import Navbar from "./components/navbar/Navbar"
import Sidebar from "./components/sidebar/Sidebar"
import {Route, Routes} from 'react-router-dom'
import AddFood from "./pages/addFood/AddFood"
import FoodList from "./pages/foodList/FoodList"
import Orders from "./pages/foodOrders/Orders"
import UpdateFood from "./pages/updateFood/UpdateFood"

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add-food" element={<AddFood/>}/>
          <Route path="/food-list" element={<FoodList/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/update-food/:id" element={<UpdateFood/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
import "./foodList.css"
import {useEffect, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'

const FoodList = () => {

  const backendUrl = 'http://localhost:4000';

  const [loading, setLoading] = useState(false)
  const [foodList, setFoodlist] = useState([]);
 
  // -------------------------------------------------------------------------------------------------

  const fetchFoodList = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${backendUrl}/api/food/food-list`)
      setFoodlist(data.foodList)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if(err.response.data.status == 'failed'){
        toast.error(err.response.data.message)
      }
    }
  }

  useEffect(()=>{
    fetchFoodList();
  },[foodList])

  // console.log('foodlist', foodList)

  // -------------------------------------------------------------------------------------------------
  const removeFood = async(foodId)=>{
    try {
      const {data} = await axios.post(`${backendUrl}/api/food/remove-food`, {_id: foodId});
      // console.log('data', data)
      if(data.status == "success"){
        // once the food is removed from list, we have to fetch new food list
        await fetchFoodList();
        toast.success(data.message)
      }
    } catch (err) {
      toast.error("something went wrong while removing foodItem");
    }
  }
  // -------------------------------------------------------------------------------------------------

  return (
    <div className="food-list">
      {
        loading && (<></>)
      }
      
      <div className="list add flex-col">
        <p>All Food List</p>
        <div className="list-table">
          <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Action</b>
          </div>
          {
            foodList && (
              foodList.map((item, index)=>(
                <div key={index} className="list-table-format">
                  <img src={`${backendUrl}/image/`+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p className="cross-icon" onClick={()=>removeFood(item._id)}>X</p>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FoodList
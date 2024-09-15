import "./foodList.css"
import {useEffect, useState} from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import {toast} from 'react-toastify'
import Pagination from "../../components/pagination/Pagination"

const FoodList = () => {

  const backendUrl = 'http://localhost:4000';

  const [loading, setLoading] = useState(false)
  const [foodList, setFoodlist] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page)=>{
    setCurrentPage(page)
  }

  // -------------------------------------------------------------------------------------------------

  const fetchFoodList = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`${backendUrl}/api/food/food-list`,{
        params: {
          page: currentPage,
        }
      })
      // console.log('data', data)
      setFoodlist(data.foodList)
      setTotalPages(data?.totalPages)
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
  },[currentPage])

  // console.log('foodlist', foodList)

  // -------------------------------------------------------------------------------------------------
  const removeFood = async(foodId)=>{
    const confirmDelete = window.confirm("Are you sure, you want to delete this record?")
    if (confirmDelete) {
      try {
        const {data} = await axios.delete(`${backendUrl}/api/food/remove-food/${foodId}`);
        // console.log('data', data)
        if(data.status == "success"){
          // once the food is removed from list, we have to fetch new food list.
          await fetchFoodList();
          toast.success(data.message);
        }
      } catch (err) {
        toast.error("something went wrong while removing foodItem");
      }
    }
    
  }
  // -------------------------------------------------------------------------------------------------

  return (
    <div className="food-list">
      {
        loading && (<></>)
      }
      
      <div className="list add flex-col">
        <h3>All Food List</h3>
        <div className="list-table">
          <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b>Edit</b>
              <b>Delete</b>
          </div>
          {
            foodList && (
              foodList.map((item, index)=>(
                <div key={index} className="list-table-format">
                  <img src={`${backendUrl}/image/`+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p><Link to={`/update-food/${item._id}`}>Edit</Link></p>
                  <p className="cross-icon" onClick={()=>removeFood(item._id)}>Delete</p>
                </div>
              ))
            )
          }
        </div>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

    </div>
  )
}

export default FoodList
import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'
import './foodDisplay.css'
import FoodCard from '../FoodCard/FoodCard';

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({category}) => {

    const { backendUrl, isLoading, isError, food_list, } = useContext(StoreContext);
    
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes</h2>

        {
            isLoading && (<>Loading....</>)
        }

        {
            isError && (<>Error...</>)
        }

        <div className="food-list">
            {
                food_list && (
                    food_list.map((item, index)=>{
                        if(category === "All" || category === item.category){
                            return (
                                <FoodCard key={index}
                                    id={item._id}
                                    name={item.name}
                                    image={`${backendUrl}/image/`+item.image}
                                    price={item.price}
                                    description={item.description}
                                />
                            )
                        }
                        
                    })
                )
            }
        </div>
    </div>
  )
}

export default FoodDisplay;
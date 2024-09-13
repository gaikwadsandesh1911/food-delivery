import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import "./foodDisplay.css";
import FoodCard from "../FoodCard/FoodCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { PulseLoader} from "react-spinners"

const FoodDisplay = () => {

  const { backendUrl, isLoading, isError, food_list, fetchMoreFoodList, hasMore } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">

      <h2>Top Dishes</h2>

      {/* add shimmer effect */}
      {isLoading && <></>}    

      {isError && <>Network Error...</>}

      <InfiniteScroll
        dataLength={food_list.length}
        next={fetchMoreFoodList}
        hasMore={hasMore}
        loader={<PulseLoader loading={isLoading} color="tomato" margin={5} className="pulse-loader"/>}
        // endMessage={<p className="no-item">No more items to load</p>}
      >
        <div className="food-list">
          {food_list &&
            food_list.map((item, index) => {
              // console.log('item', item)
              return (
                <FoodCard
                  key={index}
                  itemId={item._id}
                  name={item.name}
                  image={`${backendUrl}/image/` + item.image}
                  price={item.price}
                  description={item.description}
                />
              );
            })}
        </div>
      </InfiniteScroll>

    </div>
  );
};

export default FoodDisplay;

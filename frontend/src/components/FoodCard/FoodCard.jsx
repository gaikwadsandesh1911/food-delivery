import { useContext} from 'react'
import { assets } from '../../assets/assets'
import './foodCard.css'
import { StoreContext } from '../../context/StoreContext';

// eslint-disable-next-line react/prop-types
const FoodCard = ({itemId, image, name, price, description}) => {
    
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

    return (
    <div className='food-card'>

        <div className="food-card-img-container">
            <img className='food-card-img' src={image} alt="" />
            {
                
                !cartItems[itemId]
                 ? <img className='add-icon' onClick={()=>addToCart(itemId)} src={assets.add_icon_white}/>
                 : <div className="food-item-counter">
                        <img className='remove-icon' src={assets.remove_icon_red} onClick={()=>removeFromCart(itemId)}/>
                        <p>{cartItems[itemId]}</p>
                        <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(itemId)} />
                   </div>
            }
        </div>

        <div className="food-item-info">
            <div className="food-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">${price}</p>
        </div>

    </div>
  )
}

export default FoodCard;
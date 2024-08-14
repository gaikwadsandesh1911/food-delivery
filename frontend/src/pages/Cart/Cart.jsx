import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './cart.css';
import {useContext} from 'react'
const Cart = () => {

  const {food_list, cartItems, removeFromCart, cartTotalAmount, backendUrl} = useContext(StoreContext);
  const navigate = useNavigate();
  
  return (
    <div className='cart'>

      <div className="cart-items">

        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {
          food_list.map((item, index)=>{
            if(cartItems[item._id] > 0){ 
              return(
                <div key={index}>
                  <div className='cart-items-title cart-items-item'>
                    <img src={`${backendUrl}/image/`+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
                  </div>
                  <hr />
                </div>                  
              )
            }
          })
        }

      </div>

      <div className="cart-bottom">

        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>

            <div className="cart-total-details"> 
              <p>Subtotal</p>
              <p>${cartTotalAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${cartTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${cartTotalAmount() === 0 ? 0 : cartTotalAmount() + 2}</b>
            </div>

          </div>
          <button onClick={()=>navigate('/place-order')}>Proceed to checkout</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have promocode, Enter it here.</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Cart;
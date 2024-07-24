import { useContext } from 'react'
import './placeOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {cartTotalAmount} = useContext(StoreContext)

  return (
    <form className='place-order'>

      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input type="text" placeholder="First Name" required/>
          <input type="text" placeholder="Last Name" required/>
        </div>

        <input type="email" placeholder='Email' required/>

        <input type="text" placeholder='Street' required/>

        <div className="multi-fields">
          <input type="text" placeholder="City" required/>
          <input type="text" placeholder="State" required/>
        </div>

        <div className="multi-fields">
          <input type="text" placeholder="Zip code" required/>
          <input type="text" placeholder="Country" required/>
        </div>

        <input type="text" placeholder='Phone' required/>

      </div>

      <div className="place-order-right">

      <div className="cart-total">
          <h2 className='title'>Cart Total</h2>
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
          <button>Proceed to checkout</button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
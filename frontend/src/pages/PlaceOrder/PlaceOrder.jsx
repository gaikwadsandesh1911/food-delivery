import { useContext, useEffect, useState } from "react";
import "./placeOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";


const PlaceOrder = () => {

  const { cartTotalAmount, token, food_list, cartItems, backendUrl } = useContext(StoreContext);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // --------------------------------------------------------------------------------------------------

  const [errors, setErrors] = useState({});

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /\b\d{10}\b/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!isValidPhoneNumber(userData["phone"])) {
      newErrors.phone = "Please enter 10 digit valid phone number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

   // --------------------------------------------------------------------------------------------------

  const handleSubmit = async(e) => {

    e.preventDefault();

    const isValidForm = validateForm();

    if(isValidForm){
      // Call API
      let orderItems = []; 

      food_list && (
        food_list.map((item)=>{
          if(cartItems[item._id] > 0){
            let itemInfo = item;
            // on itemInfo added new property quantity
            itemInfo.quantity = cartItems[item._id];    // cartItems[item._id] stores quantity of perticular product in cartData
            orderItems.push(itemInfo)
          }
        })
      )
      // console.log('orderItems', orderItems)

      let orderData = {
        address : userData,
        items: orderItems,
        amount: cartTotalAmount() + 2
      }
      // console.log('orderData', orderData)

      try {
        const {data} = await axios.post(`${backendUrl}/api/order/place-order`, orderData, {
          headers: {
            token: `Bearer ${token}`
          }
        })
        console.log('stripe session data', data)

        if(data.status == 'success'){
          toast.success(data.message)
          const {session_url} = data;
          window.location.replace(session_url)
           // redirect to stripe checkout page. to pay search for stripe dummy card
        }
        else{
          toast.error("something went wrong while placing order")
        }

      } catch (error) {
        console.log(error)
      }

      // clear user form
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
      });

    }

  };

// --------------------------------------------------------------------------------------------------

const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate("/")
    }
    else if(cartTotalAmount() == 0){
      navigate("/")
    }
  },[token, navigate, cartTotalAmount])

  return (
    <form className="place-order" onSubmit={handleSubmit}>

      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          placeholder="Street"
          name="street"
          value={userData.street}
          onChange={handleChange}
          required
        />

        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={userData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={userData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="multi-fields">
          <input
            type="text"
            placeholder="Zip code"
            name="zipcode"
            value={userData.zipcode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={userData.country}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          required
        />
        {errors.phone && (
          <span className="error">{errors.phone}</span>
        )}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2 className="title">Cart Total</h2>
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
          <button type="submit">Proceed to checkout</button>
        </div>
      </div>

    </form>
  );
};

export default PlaceOrder;

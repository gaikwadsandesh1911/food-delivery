import { StoreContext } from '../../context/StoreContext';
import './myorders.css'
import {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets.js';

const MyOrders = () => {

    const {backendUrl, token} = useContext(StoreContext);

    const [orders, setOrders] = useState([]);
    
    const fetchOrders = async()=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/order/user-orders`, {}, {
                headers: {
                    token: `Bearer ${token}`
                }
            }) 
            setOrders(data?.orders);
            // console.log(orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">

            {
                orders.length > 0 && orders.map((order, i)=>(
                    <div key={order._id || i} className='my-orders-order'>
                    <img src={assets.parcel_icon} alt="" />
                    <p>
                        {
                            order.items.map((item, i)=>{
                                // access last item of the order, do not concat , after last item
                                if(i === order.items.length - 1){
                                    return `${item?.name} x ${item?.quantity}`+"."
                                }
                                else{
                                    return `${item?.name} x ${item?.quantity}`+", "
                                }
                            })
                        }
                    </p> 
                    <p>${order.amount}.00</p>
                    <p>Total Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))
            }
            {
                orders.length === 0 && <p>No orders found</p>
            }
        </div>
    </div>
  )
}

export default MyOrders
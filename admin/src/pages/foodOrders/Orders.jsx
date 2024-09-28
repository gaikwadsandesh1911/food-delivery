import "./orders.css"
import {useEffect, useState} from 'react';
import axios from 'axios'
import {assets} from '../../assets/assets'
import {io} from 'socket.io-client'

const Orders = () => {

  // ----------------------------------------------------------------------------socket connection
  const [socket, setSocket] = useState(null);
  useEffect(()=>{
    const socketConnection = io("http://localhost:4000");
    setSocket(socketConnection);

    return ()=>socketConnection.close();

  },[])
  // ---------------------------------------------------------------------------- 
  
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isError, setIsError] = useState(false);

  // ----------------------------------------------------------------------------fetch all orders
  const fetchAllOrders = async()=>{
    try {
      setIsLoading(true);
      const {data} = await axios.get(`http://localhost:4000/api/order/all-orders`);
      // console.log('allOrders', data);
      if(data?.status == 'success'){
        setOrders(data?.orders)
      }
      // console.log('orders',orders)
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false)
      setIsError(true)
      console.log('error', error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  // ----------------------------------------------------------------------------order status

  const orderStatusHandler = async(e, orderId)=>{
    // console.log(e.target.value, orderId)

    // emit an event to send to server, to update in database.
    socket.emit('updateOrderStatus', {orderId, status: e.target.value});
  
    // immediate update for admin, here!
    const updateOrderStatus = orders && (
      orders.map((order)=>(
        order._id === orderId ? {...order, status: e.target.value} : order
      ))
    )
    setOrders(updateOrderStatus);
  

    // try {
    //   const {data} = await axios.patch(`http://localhost:4000/api/order/order-status`,{
    //     orderId: orderId,
    //     status: e.target.value
    //   })
    //   if(data?.status == 'success'){
    //     fetchAllOrders();
    //   }
    // } catch (error) {
    //   console.log(error)
    // }

  }

  return (
    <div className="orders add">
      <h3>All Orders</h3>
      {
        isLoading && (<></>)
      }
      {
        isError && (<p>No New Orders Found!</p>)
      }
      
      <div className="order-list">
        {
          orders && ( orders.map((order)=>(
            <div key={order._id} className="order-item">
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p className="ordered-food">
                  {
                    order.items.map((food, i)=>{
                      // access last item of the order, do not concat , after last item, i starts from 0 it's index
                      if(i == food.length - 1){
                        return `${food.name} x ${food.quantity}`
                      }
                      return `${food.name} x ${food.quantity}`+", "
                    })
                  }
                </p>
                <p className="customer-name">
                  {
                    `${order?.address?.firstName} ${order?.address?.lastName}`
                  }
                </p>
                <div className="customer-address">
                  <p>{`${order?.address?.street},`}</p>
                  <p>{`${order?.address?.city}, ${order?.address?.state}, ${order?.address?.country}, ${order?.address?.zipcode},`}</p>
                </div>
                <p className="customer-phone">{order?.address?.phone}</p>
              </div>
              <p>Items : {order?.items?.length}</p>
              <p>${order?.amount}.00</p>
              <select onChange={(e)=>orderStatusHandler(e, order._id)} value={order?.status}>
                <option value="Food Preparing">Food Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          )))
        }
      </div>
      
    </div>
  )
}

export default Orders;
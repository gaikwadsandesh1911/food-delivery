import { Order } from "../models/orderModel.js";

const getOrderStatus = (io, socket)=>{

    // listen an event send from admin for order status update
    socket.on('updateOrderStatus', async({orderId,status})=>{
        // update order in database
        try {
            await Order.findByIdAndUpdate(orderId, {status: status}, {new: true})
        } catch (error) {
            console.log('error', error)
        }

        // broadcast an even to frontend client
        socket.broadcast.emit('orderStatus', {orderId, status});
    })
}

export {getOrderStatus};


/* 
    admin emit an event <updateOrderStatus>, here, we listen an event sokcet.on(updateOrderStatus);

    and then broadcast event to other connected client except the sender.   socket.broadcast.emit()
    here we have only two clients => 1.admin, 2.frontend

    [so, admin emit an event, we listen on server and brodcast it to frontend client]
*/
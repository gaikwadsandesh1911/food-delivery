import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Food Preparing'
    },
    date:{
        type:Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false
    }
})

export const OrderModel = mongoose.model('orders', orderSchema)
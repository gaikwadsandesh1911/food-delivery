import { useNavigate, useSearchParams } from 'react-router-dom'
import './verify.css'
import { useContext, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'


const VerifyOrder = () => {
    // eslint-disable-next-line no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {backendUrl} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        try {
            const {data} = await axios.post(`${backendUrl}/api/order/verify-order`, {success, orderId});
            if(data.status == 'success'){
                toast.success("paid successfully.")
                navigate('/my-orders')
            }
            else{
                toast.error("payment failed.")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify_order'>
        <div className="spinner"></div>
    </div>
  )
}

export default VerifyOrder
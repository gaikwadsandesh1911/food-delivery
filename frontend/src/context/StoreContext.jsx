import {createContext, useEffect, useState} from 'react';
import { food_list } from '../assets/assets';

export const StoreContext = createContext(null);

// eslint-disable-next-line react/prop-types
const StoreContextProvider = ({children})=>{

    const [cartItems, setCartItems] = useState({});

    const backendUrl = "http://localhost:4000";

    const [token, setToken] = useState("");

    // -----------------------------------------------------------------------------------------------------------

    const addToCart = (itemId)=>{
        
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]: 1}));
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+1}));
        }
    }

    // -----------------------------------------------------------------------------------------------------------

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}));
    }

    // -----------------------------------------------------------------------------------------------------------

    const cartTotalAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){ // for in => used to iterate over properties of an object
            if(cartItems[item] > 0){

                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // -----------------------------------------------------------------------------------------------------------
    
        useEffect(()=>{
            const localStorage_token = localStorage.getItem("token")
            if(localStorage_token){
                setToken(localStorage_token);
            }
        },[token])
    // -----------------------------------------------------------------------------------------------------------


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        cartTotalAmount,
        backendUrl,
        token,
        setToken
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
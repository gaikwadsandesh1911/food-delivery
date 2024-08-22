import {createContext, useEffect, useState} from 'react';
// import { food_list } from '../assets/assets';
import axios from 'axios';

export const StoreContext = createContext(null);

// eslint-disable-next-line react/prop-types
const StoreContextProvider = ({children})=>{

// ------------------------------------------------------------------------------------------------------
    // fetching foodList from backend
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [currentPage, setCurrentPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const [totalPages, setTotalPages] = useState(1)

    const itemsPerPage = 10;

    const [food_list, setFood_list] = useState([])

    const fetchFoodList = async(page)=>{
        try {
            setIsError(false)
            setIsLoading(true);

            const {data} = await axios.get(`${backendUrl}/api/food/food-list?page=${page}&limit=${itemsPerPage}`);

            console.log('foodListdata', data)

            // setFood_list(data?.foodList)
            setFood_list((prev)=>[...prev, ...data.foodList])   // display prevPage foodList and concat currentPage foodList
            setHasMore(data?.foodList.length > 0)    //

            setTotalPages(data?.totalPages)

            setIsLoading(false)
            setIsError(false)
        } catch (error) {
            console.log(error)
            setIsError(true)
            setIsLoading(false);
        }
    }

    const fetchMoreFoodList = ()=>{
        setCurrentPage((prevPage)=> prevPage + 1)   // increase page number
    }

    useEffect(()=>{
        fetchFoodList(currentPage)
    },[currentPage])

    // -----------------------------------------------------------------------------------------------------------

    const backendUrl = "http://localhost:4000";

    const [cartItems, setCartItems] = useState({});

    // signIn token
    const [token, setToken] = useState("");
    // -----------------------------------------------------------------------------------------------------------
        

    const addToCart = async(itemId)=>{
        /* 
            on the backend on user we have user.cartData
            cartData = { itemId: quantity } => if itemId is not already,  then first time we set quantity to 1

            here cartItems is our state defined above   const [cartItems, setCartItems] = useState({});
        */
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]: 1}));
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]: prev[itemId]+1}));
        }

        if(token){
            await axios.post(`${backendUrl}/api/cart/add-to-cart`, {itemId},
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                }
            )
        }

    }

    // -----------------------------------------------------------------------------------------------------------

    const removeFromCart = async(itemId)=>{

        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}));
        
        if(token){
            await axios.post(`${backendUrl}/api/cart/remove-from-cart`, {itemId},
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                }
            )
            // axios.post(url, reqbody, heders)
        }
    }

    // -----------------------------------------------------------------------------------------------------------
    
    
    
    // -----------------------------------------------------------------------------------------------------------

    const cartTotalAmount = ()=>{
        let totalAmount = 0;
        for(const item in cartItems){ // for in => used to iterate over properties of an object
            if(cartItems[item] > 0){

                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmount += itemInfo?.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // -----------------------------------------------------------------------------------------------------------

    const fetchCartData = async(token)=> {

        const {data} = await axios.get(`${backendUrl}/api/cart/cart-details`,
            {
                headers: {
                    token: `Bearer ${token}`
                }
            }
        )
        // console.log('cartData', data?.cartData)
        setCartItems(data?.cartData)
    }

// -----------------------------------------------------------------------------------------------------------

    // when refresh of webpage we will not logout. and also shows cartData fetching from db
    useEffect(()=>{
        const localStorage_token = localStorage.getItem("token")
        if(localStorage_token){
            setToken(localStorage_token);
            fetchCartData(localStorage_token);  // calling fetchCartData() function if token is available
        }
    },[token])
// -----------------------------------------------------------------------------------------------------------

    
    
    const contextValue = {

        isLoading,
        isError,
        food_list,
        fetchMoreFoodList,
        hasMore,
        // setCurrentPage,
        totalPages,
    
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        cartTotalAmount,

        token,
        setToken,

        backendUrl,
    }


    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
import { useContext, useState } from 'react'
import './loginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const LoginPopup = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState("Login");

    const [isChecked, setIsChecked] = useState(false);
    
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const {backendUrl} = useContext(StoreContext);

    const onChangeHandler = (e)=>{
        // setUserData({...userData, [e.target.name]: e.target.value})
        const {name, value} = e.target
        setUserData((prev)=>({...prev, [name]: value}));
    };

    const handleSumbit = (e)=>{

        e.preventDefault();

        let url;
        
        if(currentState === 'Login'){
            url = `${backendUrl}/api/user/login`
        }else{
            url = `${backendUrl}/api/user/register`
        }

        axios.post(url, userData)
        .then((res)=>{
            // console.log('res', res)
            if(res.data.status == "success"){
                alert(res.data?.message);
            }
            setUserData({
                name: "",
                email: "",
                password: ""
            });
    
            setIsChecked((prev)=>!prev)
        })
        .catch((error)=>{
            console.log('error', error.response.data.message);
            if(error.response.data.status == 'failed'){
                alert(error.response.data?.message)
            }
        })
            
        
    };

  return (
    <div className="login-popup">

        <form action="" className="login-popup-container" onSubmit={handleSumbit}>

            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img src={assets.cross_icon} alt="" onClick={()=>setShowLogin(false)}/>
            </div>

            <div className='login-popup-inputs'>
                {
                    currentState === "Login"
                     ? <></>
                     : <input type="text" placeholder="your name" required autoComplete='off'
                        name='name' value={userData.name} onChange={onChangeHandler} 
                     />
                }
                
                <input type="email" placeholder="your email" required autoComplete='off'
                    name='email' value={userData.email} onChange={onChangeHandler}
                 />
                <input type="password" placeholder="password" required autoComplete='off'
                    name='password' value={userData.password} onChange={onChangeHandler}
                />
            </div>

            <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
            
            <div className="login-popup-condition">
                <input type="checkbox" required 
                    checked={isChecked} onChange={()=>setIsChecked(!isChecked)}
                />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            
            {
                currentState === "Login"
                    ? <p>Create a new account? <span onClick={()=>setCurrentState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
            }
                
        </form>

    </div>
  )
}

export default LoginPopup
import { useContext, useState } from 'react'
import './loginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const LoginPopup = ({setShowLogin}) => {

    // is login or sign up form
    const [currentState, setCurrentState] = useState("Login");

    // is privacy policy checked
    const [isChecked, setIsChecked] = useState(false);
    
    // user form data
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    // toggle password visibality
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // get context values
    const {backendUrl, setToken} = useContext(StoreContext);


    // --------------------------------------------------------------------------------------------------------
    // react form onChange
    const onChangeHandler = (e)=>{
        // setUserData({...userData, [e.target.name]: e.target.value})
        const {name, value} = e.target
        setUserData((prev)=>({...prev, [name]: value}));
    };

    // --------------------------------------------------------------------------------------------------------
    // form validation errors
    const [errors, setErrors] = useState({});

    // --------------------------------------------------------------------------------------------------------
    //  email validation
    const isValidEmail = (email)=>{
        const email_regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email_regx.test(email)

    }

    // password validation
    const isValidPassword = (password)=>{

        const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const numberRegex = /[0-9]/;
        const upperCaseRegex = /[A-Z]/;
        const lowerCaseRegex = /[a-z]/;

        return (
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password)
        )
    }
    // --------------------------------------------------------------------------------------------------------
    // form validations
    const validateForm = ()=>{

        let newErrors = {};

            if(userData["name"].length < 3){
                newErrors.name = "Name should be atleast three char long ";
            }
            
            if(!isValidEmail(userData["email"])){
                newErrors.email = "Please enter valid email address"
            }
    
            if(userData["password"].length < 6){
                newErrors.password = "Password must be at least 6 character long"
            }
            else if(!isValidPassword(userData["password"])){
                newErrors.password = "Password must contain at least one symbol, one number, one uppercase letter, and one lowercase letter"
            }
            
            if(userData["confirm_password"] != userData['password']){
                newErrors.confirm_password = "Password and confirm password should be same ";
            }
            
            setErrors(newErrors);
            // console.log('errors', errors)
    
            return Object.keys(newErrors).length === 0 
         
    }

    // --------------------------------------------------------------------------------------------------------
    // handle form submission
    const handleSumbit = (e)=>{

        e.preventDefault();

        // we have currentState = 'Login'
        let isValidForm = true;

        // when currentState = 'Sign Up' then only we call validateForm() function
        if(currentState === "Sign Up"){
            isValidForm = false;
            isValidForm = validateForm();  
            
        }

        // if front-end validation is true then only we make api request.
        if(isValidForm){

            let url;

            if(currentState === 'Login'){
                url = `${backendUrl}/api/user/login`
            }else{
                url = `${backendUrl}/api/user/register`
            }

            // api request
            axios.post(url, userData)
            .then((res)=>{

                // console.log('res', res)
                
                if(res.data.status == "success"){

                    alert(res.data?.message);
                    
                    setToken(res.data.token);

                    // save token to local storage
                    localStorage.setItem("token", res.data.token)

                    // hide loginpopup
                    setShowLogin(false);
                }

                // empty userData objects field
                setUserData({
                    name: "",
                    email: "",
                    password: ""
                });
        
                setIsChecked((prev)=>!prev)
            })
            .catch((error)=>{
                // console.log('error', error);
                if(error.response.data.status == 'failed'){
                    alert(error.response.data?.message)
                }
            })     
        }
   
    };

// --------------------------------------------------------------------------------------------------------
  return (
    <div className="login-popup-overlay"
        onClick={(e)=>{
            // console.log(e)
            if(e.target.classList.contains('login-popup-overlay')){
                setShowLogin(false)
            }
        }}
    >

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
                {errors.name && (<span className='error'>{errors.name}</span>)}
                
                <input type="email" placeholder="your email" required autoComplete='off'
                    name='email' value={userData.email} onChange={onChangeHandler}
                 />
                 {errors.email && (<span className='error'>{errors.email}</span>)}

                <div className='password-container'>
                    <input type={isPasswordVisible ? "text" : "password"} placeholder="password" required autoComplete='off'
                        name='password' value={userData.password} onChange={onChangeHandler}   
                    />
                    <span onClick={()=>setIsPasswordVisible(!isPasswordVisible)}>{isPasswordVisible ? '👁️': '👁️‍🗨️'}</span>
                </div>
                {errors.password &&  (<span className='error'>{errors.password}</span>)}

                {
                    currentState === "Login"
                     ? <></>
                     : <input type="password" placeholder="confirm password" required autoComplete='off'
                        name='confirm_password' value={userData.confirm_password} onChange={onChangeHandler} 
                     />
                }
                {errors.confirm_password && (<span className='error'>{errors.confirm_password}</span>)}
                
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
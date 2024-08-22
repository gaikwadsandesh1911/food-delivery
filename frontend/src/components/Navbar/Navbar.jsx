import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin}) => {
    
    // const [navmenu, setNavmenu] = useState("home")

    const {token, setToken, cartTotalAmount, setCartItems } = useContext(StoreContext);

    const navigate = useNavigate();

    const logout = ()=>{
       localStorage.removeItem("token");
       setToken("")
       setCartItems({})
       navigate("/")
    }

  return (
    <div className='navbar'>

        <div className='navbar__logo'>
            <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>    
        </div>
        
        {/* <ul className="navbar-menu">
            <li className={navmenu == 'home' ? 'active' : ''} onClick={()=>setNavmenu('home')}><Link to='/'>Home</Link></li>
            <li className={navmenu == 'menu' ? 'active' : ''} onClick={()=>setNavmenu("menu")}>Menu</li>
            <li className={navmenu == 'mobile-app' ? 'active' : ''} onClick={()=>setNavmenu('mobile-app')}>Mobile-App</li>
            <li className={navmenu == 'contact-us' ? 'active' : ''} onClick={()=>setNavmenu('contact-us')}>Contact Us</li>
        </ul> */}

        <div className="navbar-right">
            {/* <img src={assets.search_icon} alt="" /> */}
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                <div className={cartTotalAmount() > 0 ? "dot" : ""}></div>
            </div>
            {
                !token
                    ?   <button onClick={()=>setShowLogin(true)}>sign in</button>
                    :   <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="" className='profile-icon'/>
                            <ul className='navbar-profile-dropdown'>
                                <li onClick={()=>navigate('/my-orders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                            </ul>
                        </div>
            }
        </div>

    </div>
  )
}

export default Navbar
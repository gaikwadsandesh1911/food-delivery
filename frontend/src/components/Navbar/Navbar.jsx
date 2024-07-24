import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';

// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin}) => {

    const [navmenu, setNavmenu] = useState("home")
    const {cartTotalAmount } = useContext(StoreContext)

  return (
    <div className='navbar'>

        <div className='navbar__logo'>
            <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
            
        </div>
        
        <ul className="navbar-menu">
            <li className={navmenu == 'home' ? 'active' : ''} onClick={()=>setNavmenu('home')}>
                Home
            </li>
            <li className={navmenu == 'menu' ? 'active' : ''} onClick={()=>setNavmenu("menu")}>Menu</li>
            <li className={navmenu == 'mobile-app' ? 'active' : ''} onClick={()=>setNavmenu('mobile-app')}>Mobile-App</li>
            <li className={navmenu == 'contact-us' ? 'active' : ''} onClick={()=>setNavmenu('contact-us')}>Contact Us</li>
        </ul>

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                <div className={cartTotalAmount() > 0 ? "dot" : ""}></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>sign in</button>
        </div>

    </div>
  )
}

export default Navbar
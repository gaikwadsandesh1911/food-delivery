import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { useState } from 'react';

const Navbar = () => {

    const [navmenu, setNavmenu] = useState("home")

  return (
    <div className='navbar'>

        <div className='navbar__logo'>
            <img src={assets.logo} alt="" className='logo'/>
        </div>
        
        <ul className="navbar-menu">
            <li className={navmenu == 'home' ? 'active' : ''} onClick={()=>setNavmenu('home')}>Home</li>
            <li className={navmenu == 'menu' ? 'active' : ''} onClick={()=>setNavmenu("menu")}>Menu</li>
            <li className={navmenu == 'mobile-app' ? 'active' : ''} onClick={()=>setNavmenu('mobile-app')}>Mobile-App</li>
            <li className={navmenu == 'contact-us' ? 'active' : ''} onClick={()=>setNavmenu('contact-us')}>Contact Us</li>
        </ul>

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>sign in</button>
        </div>

    </div>
  )
}

export default Navbar
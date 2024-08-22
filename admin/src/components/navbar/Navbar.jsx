import { assets } from '../../assets/assets'
import './navbar.css'
assets
const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.logo} alt="" />
        <img className='profile' src={assets.profile_image} alt="" />
        {/* <button>Sign In</button> */}
    </div>
  )
}

export default Navbar;
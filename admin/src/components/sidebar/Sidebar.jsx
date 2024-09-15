import { assets } from '../../assets/assets';
import './sidebar.css'
import {NavLink} from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to='/add-food' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Food</p>
            </NavLink>
            <NavLink to='/food-list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Food</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar;
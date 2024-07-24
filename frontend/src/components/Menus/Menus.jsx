import './menus.css'
import { menu_list } from '../../assets/assets'

// eslint-disable-next-line react/prop-types
const Menus = ({category, setCategory}) => {
  
  return (
    <div className='menus' id='menus'>
      <h1>Explore menu</h1>
      <p className='menu-text'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa voluptatibus reprehenderit quidem velit,
        iusto voluptatum?
      </p>
      <div className="menu-list">
        {
          menu_list.map((item, index)=>{
            return(
              <div key={index} onClick={()=>setCategory((prev)=>prev == item.menu_name ? "All" : item.menu_name)} className='menu-list-item'>
                <img className={category == item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                <p className={`menu-name ${category == item.menu_name ? 'active' : ''}`}>{item.menu_name}</p>
              </div>
            )
          })
        }
      </div>
      <hr />
    </div>
  )
}

export default Menus
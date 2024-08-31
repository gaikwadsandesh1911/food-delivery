import './menus.css'
import { menu_list } from '../../assets/assets'
import LazyLoadImageComponent from '../LazyLoadImage/LazyLoadImageComponent'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'


// eslint-disable-next-line react/prop-types
const Menus = () => {

  const {category, setCategory, setCurrentPage, setHasMore} = useContext(StoreContext);

  const handleCategoryChange = (menuName)=>{
    // console.log('menuName', menuName)
    setCategory((prev)=> prev === menuName ? "" : menuName)
    setCurrentPage(1)
    setHasMore(true)
  }

  return (
    <div className='menus' id='menus'>
      <h1>Choose from Category</h1>
      <p className='menu-text'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa voluptatibus reprehenderit quidem velit,
        iusto voluptatum?
      </p>
      <div className="menu-list">
        {
          menu_list.map((item, index)=>{
            return(
              // <div key={index} onClick={()=>setCategory((prev)=>prev == item.menu_name ? "" : item.menu_name)} className='menu-list-item'>
              <div key={index} onClick={()=>handleCategoryChange(item.menu_name)} className='menu-list-item'>
                {/* <img className={category == item.menu_name ? 'active' : ''} src={item.menu_image} alt="" /> */}
                <LazyLoadImageComponent className={category == item.menu_name ? 'active' : ''} src={item.menu_image}/>
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
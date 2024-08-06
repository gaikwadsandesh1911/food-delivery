import { assets } from "../../assets/assets";
import {useState} from 'react'
import "./addFood.css";
import axios from 'axios'
import { toast } from 'react-toastify';

const AddFood = () => {

  let backendUrl = 'http://localhost:4000'

  const [imageFile, setImageFile] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "" 
  });
  // -----------------------------------------------------------------------------------------------------------------
  
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({...prev, [name]: value}))
  }

// -----------------------------------------------------------------------------------------------------------------

  const [errors, setErrors] = useState({});

  const formValidation = ()=>{

    let newErrors = {}

    if(!imageFile){
      newErrors.imageFile = "Please choose an image file to upload"
    }

    if(formData["name"].trim().length < 4){
      newErrors.name = "Name should be at least four char long"
    }

    
    if(formData["description"].trim().length < 10){
      newErrors.description = "Description should be at least ten char long"
    }

    setErrors(newErrors)
    // console.log('errors', errors)
    
    return Object.keys(newErrors).length === 0;
  }
  // -----------------------------------------------------------------------------------------------------------------
  
  const handleSubmit = (e)=>{

    e.preventDefault();
    
    const isValid =  formValidation();
    
    //  if formValidation is true then only we make api call
    if(isValid){

      // console.log('formData', formData)

      const data = new FormData();
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('category', formData.category)
      data.append('price', Number(formData.price))
      data.append('image', imageFile)

      axios.post(`${backendUrl}/api/food/add-food`, data)
        .then((res)=>{
          console.log('res', res)
          if(res.data.status === 'success'){
            toast.success(res.data.message)
          }
        })
        .catch((error)=>{
          console.log(error)
        });

      // console.log('data', data);

      setFormData({
        name: "",
        description: "",
        price: "",
        category: ""
      })
      setImageFile(false)
    }
    
  }

  return (
    <div className="add-food">
      <form onSubmit={handleSubmit}>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={imageFile ? URL.createObjectURL(imageFile) : assets.upload_area} alt="" />
          </label>
          <input type="file" name="image" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])}
           id='image' hidden/>
        </div>
        {
          errors.imageFile && <span className="error">{errors.imageFile}</span>
        }

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" name='name' value={formData.name} onChange={handleChange}
           placeholder='Type here'autoComplete="off" required/>
        </div>
        {
          errors.name && <span className="error">{errors.name}</span>
        }

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" value={formData.description} onChange={handleChange}
           rows='6' placeholder='Write description here' autoComplete='off' required></textarea>
        </div>
        {
          errors.description && <span className="error">{errors.description}</span>
        }


        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value=""  hidden readOnly>select category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodels">Noodels</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="number" min={1} name='price' value={formData.price} onChange={handleChange} placeholder="$20" autoComplete='off' required/>
          </div>
        </div>

        <button type='submit' className='add-btn' >Add</button>

      </form>
    </div>
  );
};

export default AddFood;

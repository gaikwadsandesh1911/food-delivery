import { useParams, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react";
import './updateFood.css'
import axios from "axios";

const UpdateFood = () => {

    const  { id } = useParams();

    const navigate = useNavigate();

    const [imagePreview, setImagePreview] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        price: "", 
    });

    const [newImage, setNewImage] = useState(null);

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({...prev, [name]: value}));
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        console.log('file', file)
        setNewImage(file)
        setImagePreview(URL.createObjectURL(file))
    }

    const [errors, setErrors] = useState({});

    // ---------------------------------------------------------------------------
    // fetch  food to be updated
    let backendUrl = 'http://localhost:4000'

    useEffect(()=>{
        const fetchSingleFood = async()=>{
            try {
                const {data} = await axios.get(`${backendUrl}/api/food/single-food/${id}`);
                console.log('res', data)
                if(data.status == 'success'){
                    setFormData({
                        name: data?.food?.name,
                        price: data?.food?.price,
                    });
                    setImagePreview(`${backendUrl}/image/` + data?.food?.image);
                }
            } catch (error) {
                console.log('error', error)
            }
        }
        
        fetchSingleFood();
    },[backendUrl, id])

    // ------------------------------------------------------------------------------
    
    const formValidation = ()=>{

        let newErrors = {}
    
        if(formData["name"].trim().length < 4){
          newErrors.name = "Name should be at least four char long"
        }
        setErrors(newErrors);
        // console.log('errors', errors)
        
        return Object.keys(newErrors).length === 0;
    }

// ---------------------------------------------------------------------------------------

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('image', newImage);

    const handleSubmit = (e)=>{
        e.preventDefault()
        const isValid =  formValidation();
        if(isValid){
            axios.put(`${backendUrl}/api/food/update-food/${id}`, data)
            .then(()=>{
                console.log('food updated successfully')
                navigate('/food-list');
            })
            .catch((error)=>{
                console.log('error', error)
            })
            
            setFormData({
                name: "",
                price: "",
            });
            setImagePreview(null)
            setNewImage(null);
        }
    }

  return (
    <div className="update-food">
        <form onSubmit={handleSubmit}>

            <div className="update-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                  {
                    imagePreview && ( <img src={imagePreview} alt="" /> )
                  } 
                </label>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange}
                    id='image' hidden
                />
            </div>


            <div className="update-name flex-col">
                <p>Product Name</p>
                <input type="text" name='name' value={formData.name} onChange={handleChange}
                placeholder='Type here'autoComplete="off" required/>
            </div>
            {
            errors.name && <span className="error">{errors.name}</span>
            }
            
            <div className="update-price flex-col">
                <p>Product price</p>
                <input type="number" min={10} name='price' value={formData.price} onChange={handleChange} 
                placeholder="$20" autoComplete='off' required
                />
            </div>

            <button type='submit' className='update-btn'>Update</button>

        </form>
    </div>
  )
}

export default UpdateFood
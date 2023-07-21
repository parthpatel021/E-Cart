import React,{useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd';
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    //get All categories
    const getAllCategories = async () => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if(data?.success){
                setCategories(data?.category);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in getting category')
        }
    };

    useEffect(() => {
        getAllCategories();
    },[]);

    // Create Product function
    const handleCraete = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description)
            productData.append("price", price)
            productData.append("quantity", quantity)
            productData.append("photo", photo)
            productData.append("category", category)
            productData.append("shipping", shipping)
            
            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            if(data?.success){
                toast.success(data?.message);
                navigate('/dashboard/admin/products');
            } else {
                toast.error(data?.message);
            }


        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

  return (
    <Layout title='Dashboard - Create Product'>
        <div className='container-fluid m-3 p-3 dashboard'>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Create Product</h1>
                    <div className='m-1 w-75'>
                        {/* Selecing Category */}
                        <Select 
                            bordered={false} 
                            placeholder="Select a category" 
                            size="large" 
                            showSearch 
                            className='form-select mb-3'
                            onChange={(value) => {setCategory(value)}}
                        >
                            {categories?.map(c => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}

                        </Select>
                        
                        {/* Input Photo */}
                        <div className='mb-3'>
                            <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : "Upload Photo"}
                                <input 
                                    type='file' 
                                    name="photo" 
                                    accept='image/*' 
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        {/* For img preview */}
                        <div className='mb-3'>
                            {photo && (
                                <div className='text-center'>
                                    <img 
                                        src={URL.createObjectURL(photo)} 
                                        alt='product_Photo' 
                                        height={'200px'}
                                        className='img img-responsive'
                                    />
                                </div>
                            )}
                        </div>

                        <div className='mb-3'>
                                <input 
                                    type='text' 
                                    value={name} 
                                    placeholder='Write a name' 
                                    className='form-control' 
                                    onChange={(e) => setName(e.target.value)}
                                />
                        </div>
                        <div className='mb-3'>
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                                <input 
                                    type='number' 
                                    value={price} 
                                    placeholder='Write a price' 
                                    className='form-control' 
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                        </div>
                        <div className='mb-3'>
                                <input 
                                    type='number' 
                                    value={quantity} 
                                    placeholder='Write a quantity' 
                                    className='form-control' 
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                        </div>
                        {/* Shipping Selection */}
                        <Select 
                            bordered={false} 
                            placeholder="Select Shipping" 
                            size="large" 
                            className='form-select mb-3'
                            onChange={(value) => {setShipping(value)}}
                        >
                            <Option value="0">No</Option>
                            <Option value="1">Yes</Option>
                        </Select>

                        <div className='mb-3'>
                            <button 
                                className='btn btn-primary'
                                onClick={handleCraete}
                            >
                                Create Product
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct
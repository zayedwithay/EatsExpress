import React from 'react'
import { useState } from 'react';
import { assets } from '../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {
    
    const [image, setImage] = useState(false);
    const [data, setData] = useState({

        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({

                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else {
toast.error(response.data.message)
        }
    }




    return (
        <div className='mt-5 ml-20   text-slate-950 text-xl '>
            <form className='flex  flex-col gap-3 font-outfit' onSubmit={onSubmitHandler}>
                <div className=" flex-col flex gap-2">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img className='w-36' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name  flex gap-2 flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" className='border border-black' name='name' placeholder='Type here' />
                </div>
                <div>
                    <p>Product description</p>
                    <textarea className='w-96 border border-black' name="description" rows="6" onChange={onChangeHandler} value={data.description} placeholder='Write Description' required id=""></textarea>
                </div>
                <div className='flex gap-8 '>


                    <div className='flex flex-col gap-2'>
                        <p>Product category</p>
                        <select onChange={onChangeHandler} value={data.category} className='border border-black' name="category" id="">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} className='border border-black' type="number" name='price' placeholder='₹100' />
                    </div>

                </div>
                <button type='submit' className='bg-orange-500 hover:bg-orange-400 rounded-lg w-28 p-1 ml-32 mt-4'>ADD</button>
            </form>
        </div>
    )
}

export default Add

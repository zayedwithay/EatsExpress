import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {

    const [list, setList] = useState([]);

    

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        console.log(response.data)
        if (response.data.success) {
            setList(response.data.data)

        }
        else {
            toast.error("Error")
        }
    }

    const removeFood = async(foodId)=>{
const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
await fetchList()
if(response.data.success)
    {
        toast.success(response.data.message)
    }
    else{
        toast.error("Error")
    }
    }

    useEffect(() => {

        fetchList();

    }, [])

    return (
        <div className='w-4/5'>
            <p className='text-3xl font-outfit m-4 '>All Food List</p>
            <div className='m-4'>
                <div className='grid grid-cols-5  items-center gap-2 p-2 border border-gray-400 font-thin font-outfit text-xl'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, i) => {
                    return (
                        <div key={i} className='grid grid-cols-5  items-center gap-3   p-2 border border-gray-400 font-light font-outfit text-xl'>
                            <img src={`${url}/images/`+item.image} className='w-32' alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                            <p onClick={()=>removeFood(item._id)}  className='cursor-pointer'>X</p>

                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default List

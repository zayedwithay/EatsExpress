import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from "../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {

   

    const {cartItems, addToCart , removeFromCart,url} = useContext(StoreContext);

    return (
        <div className='rounded-lg bg-white shadow-md shadow-gray-700/20 cursor-pointer '>
            <div>
                <img className='rounded-lg relative ' src={url+"/images/"+image} alt="" />
                {!cartItems[id]
                    ? <img className='add w-10 -mt-14 ml-48 absolute cursor-pointer mx-2' onClick={() => addToCart(id)} src={assets.add_icon_white} />
                    : <div className=' flex gap-3 -mt-12 ml-32 absolute  items-center p-1 rounded-full bg-white '>
                        <img className='w-7' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                        <p className='mt-1' > {cartItems[id]}</p>
                        <img className='w-7' onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
                    </div>

                }
            </div>
            <div className='p-1 mx-1 flex justify-between items-center '> 
                <p className=' font-outfit font-medium text-lg   '>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className='p-1 mx-1'>{description}</p>
            <p className=' text-orange-500 text-lg font-outfit p-1 mx-1'>₹{price}</p>
        </div>
    )
}

export default FoodItem

import { useContext, useState } from "react";
import React from 'react'
import {StoreContext} from '../../context/StoreContext'
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const navigate = useNavigate();
        
        const {cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);

        const [inputText, setInputText] = useState('');

        const handleInputChange = (e) => {
          setInputText(e.target.value);
        };
      
        const showAlert = () => {
          if(inputText === "FREE100")
         {  alert("Bhakk Gareeb!!");}
          else{
            alert("Invalid Promo Code");
          }
        };
      
  return (
    <div className="mt-16 mx-16">
      <div >
        <div className="grid grid-cols-6 items-center gap-5 " >
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,i)=>{
          if(cartItems[item._id]>0)
            {
              // flex my-5 items-center  gap-10
              return (
<div>

                <div className="grid grid-cols-6 items-center gap-5 my-6">
                
               <img className="w-16 h-16 rounded-full" src={url+"/images/"+item.image} alt="" />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>₹{(item.price)*cartItems[item._id]}</p>
              <p className="cursor-pointer text-red-500 font-bold font-outfit" onClick={()=>{removeFromCart(item._id)}}>X</p>
              
                </div>
                <hr className="" />
</div>


              )
            
          }
         

        })}
      </div>

      <div className="mt-8 flex justify-between ">
        <div className="flex w-96 flex-col gap-4">
          <h2 className="text-xl font-outfit font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>

            </div>
            <hr className="m-2"/>
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount()===0?0:20}</p>
            </div>
            <hr className="m-2 " />
            <div className="flex justify-between text-xl">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0:(getTotalCartAmount()+20)}</b>
            </div>
          </div>
            <button onClick={()=>navigate('/order')} className="text-white bg-orange-600 w-64 my-8 p-2 rounded-lg ">PROCEED TO CHECKOUT</button>
        </div>
        <div >
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="flex flex-row justify-between mt-4">
              <input value={inputText} onChange={handleInputChange} className="border border-black rounded-md h-10" type="text" placeholder="promo code" name="" id="" />
              <button onClick={showAlert} className="text-white bg-orange-600   px-3  rounded-lg">Submit</button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}



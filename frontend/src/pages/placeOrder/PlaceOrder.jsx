import { useContext, useState,useEffect } from "react";
import React from 'react'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export default function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);


  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;

        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);

      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    }
    let response = await axios.post(url+"/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      navigate("/myorders")
      toast.success("Order Placed ")
    }
    else {
      
      
      
      toast.error("Error!")
    }
  }

  

  useEffect(() => {
  if(!token)
    {
navigate('/cart')
    }
    else if(getTotalCartAmount()===0)
{
  navigate('/cart')
}
  
  
  }, [token])
  



  return (
    <form onSubmit={placeOrder} className="flex my-10  m-5" action="">
      <div className="w-full mx-16">
        <p className="font-outfit text-2xl font-semibold my-5">Delivery Information</p>
        <div className="flex gap-2">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} className="mb-4  p-2 border rounded-lg outline-orange-500" type="text" placeholder='First Name' />
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="text" placeholder='Last Name' />
        </div>
        <div className="flex gap-2">
          <input required name="email" onChange={onChangeHandler} value={data.email} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="email" placeholder='Email address' />
          <input required name="street" onChange={onChangeHandler} value={data.street} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="text" placeholder='Street' />
        </div>
        <div className="flex gap-2">
          <input required name="city" onChange={onChangeHandler} value={data.city} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="text" placeholder='City ' />
          <input required name="state" onChange={onChangeHandler} value={data.state} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="text" placeholder='State' />
        </div>

        <div className="flex w-2/3 gap-2">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="text" placeholder='Zip code' />
          <input required name="country" onChange={onChangeHandler} value={data.country} className="mb-4  p-2 border rounded-lg  outline-orange-500" type="text" placeholder='Country' />
        </div>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} className="mb-4 w-64 ml-20 p-2 border rounded-lg  outline-orange-500" type="text" placeholder='Phone Number' id="" />
      </div>
      <div>

        <div className="flex w-96 flex-col gap-4 my-16 mr-20 ">
          <h2 className="text-xl font-outfit font-semibold">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-gray-600">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>

            </div>
            <hr className="m-2" />
            <div className="flex justify-between text-gray-600">
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr className="m-2 " />
            <div className="flex justify-between text-xl">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 20)}</b>
            </div>
          </div>
          <button type="submit" className="text-white bg-orange-600 w-40 my-4 p-2 rounded-lg  font-outfit ">Place Order</button>
        </div>
      </div>
    </form>
  )
}

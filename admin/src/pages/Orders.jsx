import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { assets } from '../assets/assets';

const Orders = ({ url }) => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("Error")

    }
  }

  useEffect(() => {
    fetchAllOrders()
  })

  const statusHandler = async (event,orderId) =>{
const response = await axios.post(url+"/api/order/status",{
  orderId,
  status:event.target.value
})
if (response.data.success){
  await fetchAllOrders();
}
  }

  return (
    <div className='mt-8 w-5/6 mx-2 font-outfit'>
      <h3 className='text-2xl font-semibold '>Order Page</h3>
      <div className='flex  flex-col gap-5 mt-5 '>
        {orders.map((order, i) => (
          <div key={i} className='grid grid-cols-5 rounded-lg  w-4/5 p-1 ml-20 items-start gap-5 border border-orange-600  text-lg '>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='font-semibold'>
                {order.items.map((item, i) => {
                  if (i === order.items.length - 1) {
                    return item.name + " X " + item.quantity
                  }
                  else {
                    return item.name + " X " + item.quantity + " , "
                  }
                })}
              </p>
           <p className='font-medium'>{order.address.firstName+" "+order.address.lastName}</p>
             <div>
              <p className='font-light'>{order.address.street+","}</p>
              <p className='font-light'>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
             </div>
             <p className='font-light'>{order.address.phone}</p>
            </div>
            <p>Items:  {order.items.length}</p>
            <p className='font-semibold'>₹{order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='my-3 border border-orange-500 rounded-lg outline-none' >
               <option value="Food Processing">Food Processing</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option></select>
          </div>


        ))}
      </div>
    </div>
  )
}

export default Orders

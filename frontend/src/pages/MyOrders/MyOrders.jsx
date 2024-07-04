import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'



const MyOrders = () => {

  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);


  const fetchOrders = async () => {

    const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data)

  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])


  return (
    <div className='mt-8 mx-20  font-outfit'>
      <h2 className='text-2xl font-semibold'>My Orders</h2>
      <div className='flex  flex-col gap-5 mt-5'>
        {data.map((order, i) => {
          return (
            <div key={i} className='grid grid-cols-6 items-center rounded-lg  gap-5 text-lg p-4 border border-gray-600'>
              <img className='w-14' src={assets.parcel_icon} alt="" />
              <p>{order.items.map((item, i) => {
                if (i === order.items.length-1) {
                  return item.name + " X " + item.quantity
                }
                else {
                  return item.name + " X " + item.quantity + " , "
                }
              })}</p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span className=' @apply text-[red] mr-1 text-xl'>&#x25cf;</span><b className='font-normal'>{order.status}</b></p>
              <button onClick={fetchOrders} className='p-1 w-32 rounded-lg cursor-pointer text-white bg-orange-400'>Track Order</button>
            </div>
          )

        })

        }
      </div>
    </div>
  )
}

export default MyOrders

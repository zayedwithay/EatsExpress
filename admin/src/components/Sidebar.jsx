import React from 'react'

import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='w-1/5 h-screen border border-black border-t-0 border-solid'>
      <div className='pt-10 pl-12 flex flex-col gap-5'>
        <NavLink to='/add'  className='  [&.active]:bg-orange-500 flex items-center gap-3 border border-black border-r-0 p-4 rounded-l-2xl cursor-pointer'>
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='flex [&.active]:bg-orange-500  items-center gap-3 border border-black border-r-0 p-4 rounded-l-2xl cursor-pointer'>
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className='flex [&.active]:bg-orange-500 items-center gap-3 border border-black border-r-0 p-4 rounded-l-2xl cursor-pointer'>
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

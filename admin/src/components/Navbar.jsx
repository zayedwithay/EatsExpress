import React from 'react'
import { assets } from '../assets/assets'
export default function Navbar() {
  return (
    <div className='flex justify-between items-center p-4'>
        <div>

       <div className='text-orange-500 mx-3 my-1 text-2xl font-sans font-bold' >  EatsExpress </div>
      <div className='mx-7 font-medium'>Admin Panel</div>
      
        </div>
      <img src={assets.profile_image} alt="" />
    </div>
  )
}

import React from 'react'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div> 

    
    <div className='mt-20 flex flex-col h-72 bg-black text-white justify-between p-10   ' id='contact'>
      <div className='w-full grid grid-cols-3  gap-5 '>
        <div className="left  ">
<h1  className='text-orange-500  text-4xl font-sans mt-5 font-bold'>EatsExpress</h1>
    <p className='mt-3'>Fast, Fresh, and Delicious Food Delivered Right to Your Doorstep Anytime, Anywhere. </p>

        </div>
        <div className="centre ml-20">

            <h2 className='text-orange-500 text-xl font-outfit mt-6 font-bold'>COMPANY</h2>
            <ul className='flex flex-col ml-4 gap-1 mt-2'>
            <li>Home</li>
            <li>About </li>
            <li>Careers</li>
            <li>Privacy Policy</li>
            </ul>

        </div>
<div className="roght">
<h2 className='text-orange-500 text-xl font-outfit mt-6 font-bold'>GET IN TOUCH</h2>
<ul className='flex flex-col ml-1 gap-1 mt-2 '>
    <li>+91 8808715218</li>
    <li>zayedeve@gmail.com</li>
</ul>
<div className='flex flex-row gap-3 mt-5'>
   <a className='cursor-pointer' href="https://github.com/zayedwithay"><img src={assets.facebook_icon} alt="" /></a> 
   <a className='cursor-pointer' href="https://x.com/zayedev"> <img src={assets.twitter_icon} alt="" /> </a>
   <a className='cursor-pointer' href="https://www.linkedin.com/in/contactzayed/"> <img src={assets.linkedin_icon} alt="" /></a>
</div>
</div>
      </div>
      
    </div>
      <p className='bg-orange-600 w-full flex items-center justify-center   text-white'> Copyright 2025 © EatsExpress - All Right Reserved.  </p>
    </div>
  )
}

export default Footer

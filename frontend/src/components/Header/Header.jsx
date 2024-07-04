import React from 'react'
import  './header.css'
function header() {
  return (
    <div  className='head mx-32 h-96 w-2/3 my-12  '>
      
<div  className='headerContent absolute flex-col gap-1 max-w-1/2 '>
 
    <h2 className='text-5xl font-bold text-white  text my-24 font-outfit  ' > Your favourite foooooooooooooooooooooooood few clicks away</h2>
    
   <a href='#dish'> <button  className='border-2  border-white rounded-lg px-2 mx-9 my-8   text-white  border-solid'>Order Now</button>
   </a>
</div>


    </div>
  )
}

export default header

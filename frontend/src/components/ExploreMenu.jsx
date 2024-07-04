import React from 'react'
import { menu_list } from '../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='flex-col gap-5' id='menu'>
        <h1 className='font-outfit font-bold text-2xl mx-16'>What's on your mind?</h1>

        <div className=' flex justify-between items-center gap-7 mx-14 my-8 text-center'>
            {menu_list.map(( item , i)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={i} className=' '>
                        <img className={category===item.menu_name? "bg-orange-400 border-1 px-1 py-1 border-solid   active w-28 min-w-4 cursor-pointer rounded-full": "w-28 min-w-4 cursor-pointer rounded-full"}    src={item.menu_image} alt="" />
                        <p className='my-2 text-gray-600 font-outfit'>{item.menu_name}</p>
                        
                        
                         </div>
                )
                
                })}
        </div>
            <hr className='mx-20 my-2 h-0.25 bg-gray-400 ' />
      
    </div>
  )
}

export default ExploreMenu

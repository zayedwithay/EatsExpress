import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'


export default function Navbar({setshowLogin}) {
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
 const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem("token")
    setToken("");
      navigate("/")
    
  }
  return (
    <div className='navbar  top-0 w-full bg-white mb-5 h-12 flex justify-between border border-solid border-slate-200 '>

    <Link to='/'> <div className='text-orange-500 mx-3 my-1 text-2xl font-sans font-bold' > EatsExpress </div></Link>

        <ul className='mx-4 my-2 flex gap-7   text-orange-500 text-lg font-outfit '>
            <a href="#menu"><li>Menu</li></a>
           <a href="#contact"> <li>Contact</li></a>
          <Link to='/cart'><li className=' relative '  >  <img src={assets.basket_icon} className='h-5 my-1' alt="" />
            <div className={getTotalCartAmount()===0?'':'dot absolute min-h-2 min-w-2 bg-orange-500 rounded -top-0.5 -right-1'}> </div>
            </li></Link> 
            <li >
              
              {!token?<img src={assets.profile_icon} onClick={()=>setshowLogin(true)} className='h-5 cursor-pointer my-1' alt="" />
              :<div className=' flex ' >
           
                <ul className='  flex gap-2 '>
                  <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" className='h-5 cursor-pointer my-1' /></li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="" className='h-5 cursor-pointer my-1' /></li>
                </ul>
              </div>
              }
           
            </li>
        </ul>
        
       
    </div>
  )
}

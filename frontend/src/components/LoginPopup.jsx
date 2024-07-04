import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import axios from "axios"


export default function LoginPopup({ setshowLogin }) {


  const { url, setToken } = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })


  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))

  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "login") {
      newUrl += "/api/user/login"
    }
    else {
      newUrl += "/api/user/register"
    }

    const response = await axios.post(newUrl, data)


    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token)
      setshowLogin(false)
    }
    else {
      alert(response.data.message)
    }



  }



  return (
    <div className='lp absolute z-10 w-full h-full bg-black/55  grid' >
      <div className='bg-white place-self-center w-96 flex flex-col gap-8 p-6 rounded-lg text-xl' >
        <form onSubmit={onLogin} action="">
          <div className='flex justify-between'>
            <h2 className='text-3xl font-medium'>{currState}</h2>
            <img onClick={() => setshowLogin(false)} src={assets.cross_icon} className='h-4 w-4 cursor-pointer' alt="" />
          </div>
          <div className='flex flex-col gap-3 mt-4'>
            {currState === "login" ? <></> : <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' />}

            <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Your email' required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' />
            <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ' />
          </div>
          <button type='submit' className='w-full mt-4 text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>{currState==="Sign Up"?"Create Account":"login"}</button>
          <div className='flex gap-2 mt-4'>
            <input type="checkbox" name="" id="" required />
            <p className='text-xs'>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {currState === "login" ? <p className='text-base mt-2'>Create a new Account? <span onClick={() => setCurrState("Sign Up")} className='text-orange-600 cursor-pointer'>Click Here</span></p>
            : <p className='text-base mt-2'>Already have an account?  <span onClick={() => setCurrState("login")} className='text-orange-600 cursor-pointer'>Login here</span></p>}

        </form>

      </div>
    </div>
  ) 
}

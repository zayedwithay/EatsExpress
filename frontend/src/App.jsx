import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/placeOrder/PlaceOrder'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  const [showLogin, setshowLogin] = useState(false)

  return (
    <>
    {showLogin? <LoginPopup setshowLogin={setshowLogin} /> :<></>}
    <div className=''>
    <ToastContainer/>
      <Navbar setshowLogin={setshowLogin}/>
      
    <Routes>

      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/order' element={<PlaceOrder/>} />
      <Route path='/myorders' element={<MyOrders/>} />

    </Routes>

      <div className=" font-outfit ">  </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default App

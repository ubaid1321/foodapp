import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'


function App() {
  const [count, setCount] = useState(0)
  const [showlogin,setShowlogin]=useState(false)
  return (
    <>
    {showlogin?<LoginPopup setShowlogin={setShowlogin} />:<></>}
     <div className='app'>
     <Navbar setShowlogin={setShowlogin}/>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/order" element={<PlaceOrder/>} />
     </Routes>
     </div>
     <Footer/>
    </>
  )
}

export default App

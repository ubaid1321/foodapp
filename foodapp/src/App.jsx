import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { auth } from './firebase/Firebase'; // Import auth from Firebase

function App() {
  const [showlogin, setShowlogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setShowlogin(false); // Hide login popup if user is logged in
      } else {
        setShowlogin(true); // Show login popup if user is not logged in
        navigate("/"); // Redirect to home if not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [navigate]);

  return (
    <>
      {showlogin && <LoginPopup setShowlogin={setShowlogin} />}
      <div className='app'>
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
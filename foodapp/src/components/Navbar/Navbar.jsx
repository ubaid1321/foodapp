import React, { useState, useEffect, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { auth } from '../../firebase/Firebase'; // Import auth from Firebase

const Navbar = ({ setShowlogin }) => {
  const [menu, setMenu] = useState("Home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getTotalCartAmount } = useContext(StoreContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setShowlogin(true);
    }).catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="logo" /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("Mobile App")} className={menu === "Mobile App" ? "active" : ""}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu("Contact us")} className={menu === "Contact us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        <img src={assets.search_icon} alt="" />
        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => setShowlogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
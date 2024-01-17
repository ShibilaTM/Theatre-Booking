import React, { useState } from 'react';
import logo from '../assets/newlogo.PNG';
import { BiSearch } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav>
      <div className='left'>
        <img src={logo} alt='logo' width={100} height={100} />
        <div className='searchbox'>
          <BiSearch className='searchbtn' />
          <input type='text' placeholder='Search For a Movie' />
        </div>
      </div>

      <div className='right'>
        {/* Render mobile menu icon */}
        <div className='mobile-menu-icon' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </div>
        {/* Conditionally render dropdowns based on screen size */}
        {!isMobileMenuOpen && (
          <>
            <p className='dropdown'>Kerala <RiArrowDropDownFill className='dropicon' /></p>
            <p className='login-dropdown'><Link to={'/login'} style={{textDecoration:'none',color:'white'}}>Login</Link> <RiArrowDropDownFill className='dropicon' /></p>
            <p className='signup'><Link to={'/signup'} style={{textDecoration:'none',color:'white'}}>Signup</Link></p>
          </>
        )}

        
      </div>
    </nav>
  );
}

export default Navbar;



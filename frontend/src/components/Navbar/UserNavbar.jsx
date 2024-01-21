import React, { useState } from 'react'
import logo from '../assets/newlogo.PNG';
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { RiArrowDropDownFill } from "react-icons/ri";
import {Link} from 'react-router-dom'
const UserNavbar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
   <nav>
    <div className='left'>
        <img src={logo} alt='logo' width={100} height={100}/>
        <div className="searchbox">
            <BiSearch className='searchbtn' />
            <input type='text' placeholder='Search For a Movie'/>
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
            {/* <Link to={'/user'} className='signup'>Home</Link>
            <p className='dropdown'>Kerala <RiArrowDropDownFill className='dropicon'/></p> */}
            <Link className='signup' to={'/'}>Logout</Link>
            <Link className='linkstylenone'>
                <BiUserCircle className='theme_icon1'/>
            </Link>
            </>
        )}
              
    </div>
   </nav>
  )
}

export default UserNavbar




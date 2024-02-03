import React, {  useState } from 'react'
import './Sidebar.css'
import {
  FaTh,
  FaFileImport,
  FaBars
} from "react-icons/fa";
import { RiDiscussFill } from "react-icons/ri"
import { BiSolidReport } from "react-icons/bi";
import { FaPersonCircleQuestion } from "react-icons/fa6"
import { NavLink } from 'react-router-dom';
import { MdGrade } from "react-icons/md"
import { IoLogOut } from "react-icons/io5"

const Sidebar = ({ Children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: '/dash',
      name: 'Dashboard',
      icon: < FaTh />
    },
    {
      path: '/submissions',
      name: 'Submissions',
      icon: <FaFileImport />
    },
    {
      path: '/projectreport',
      name: 'Project Report',
      icon: <BiSolidReport />
    },
    {
      path: '/viva',
      name: 'Viva Voce',
      icon: < FaPersonCircleQuestion />
    },
    {
      path: '/discussion',
      name: 'Discussion Forum',
      icon: <RiDiscussFill />
    },
    {
      path: '/grades',
      name: 'Grades',
      icon: < MdGrade />
    },
    {
      path: '/logout',
      name: 'Logout',
      icon: <IoLogOut />
    }
  ]
  return (
    <div className='container'>
      <div style={{ width: isOpen ? '300px' : '50px' }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">Project</h1>
          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className='link'>
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? 'block' : 'none' }} className='link_text'>{item.name}</div>
            </NavLink>

          ))
        }
      </div>
      <main>{Children}</main>
    </div>
  )
}

export default Sidebar

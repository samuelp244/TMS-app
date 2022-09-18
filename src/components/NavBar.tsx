import React from 'react'
import {Link} from 'react-router-dom'
import {MdDarkMode} from 'react-icons/md'
const NavBar = () => {
  return (
    <div className="navbar">
        <div className="navlinks">
          <Link to='/' className="nav-link">Home</Link>
          <Link to='/about' className="nav-link">About</Link>
          <Link to='/contact' className="nav-link">Contact</Link>
          <MdDarkMode className='nav-link'/>
          
          
        </div>
    </div>
      
    
  )
}

export default NavBar

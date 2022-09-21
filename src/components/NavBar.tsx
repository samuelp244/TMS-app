import React from 'react'
import {Link} from 'react-router-dom'
import {MdDarkMode} from 'react-icons/md'
const NavBar = () => {
  return (
    <div className="fixed w-full h-20 items-center flex flex-row justify-between bg-gray-300">
        <div className='text-4xl'>TICKET.EASY</div>
        <div className="w-1/2 flex flex-row justify-evenly px-2 text-gray-700 text-xl">
          <Link to='/' className=" hover:text-2xl">Home</Link>
          <Link to='/about' className=" hover:text-2xl">About</Link>
          <Link to='/contact' className=" hover:text-2xl">Contact</Link>
          <MdDarkMode className=" hover:text-2xl "/>
          
          
        </div>
    </div>
      
    
  )
}

export default NavBar

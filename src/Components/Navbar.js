import React from 'react'
import { AiOutlineMenu } from 'react-icons/ai';

import './css/Navbar.css';

import Search from './Search'

const Navbar = ({setSidebar}) => {

  return (
    <header className='navbar'>
      <h2 className='logo'>VegetarianWorld</h2>
      <Search />
      <button 
        className='icon-btn'
        onClick={setSidebar}
      >
        <AiOutlineMenu className='menu'/>
      </button>
    </header>
  )
}

export default Navbar
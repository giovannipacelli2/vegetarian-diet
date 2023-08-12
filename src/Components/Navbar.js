import React from 'react'
import './css/Navbar.css';

import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';


// Import Components
import Search from './Search'

const Navbar = ({setSidebar}) => {

  return (
    <header className='navbar'>
      <Link to='/' className='none-link'>
        <h2 className='logo'>VegetarianWorld</h2>
      </Link>
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

Navbar.defaultProps = {
  setSidebar : ()=>{}
}

export default Navbar
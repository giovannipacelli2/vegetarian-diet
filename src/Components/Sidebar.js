import React from 'react';
import './css/Sidebar.css';

import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ filter, setFilter, setSidebar, isOpenSidebar }) => {

  const filterSection = ()=> {

    let tmpArr = [];
    let index = 0;

    for ( let item in filter ) {

      const name = item;
      const value = filter[item];
      
      const JSX = <div key={index} className="filter">
        <label htmlFor={name}>{name}</label>

        <input 
          type="checkbox"
          name={name} 
          id={name} 
          onChange={ (e)=>{setFilter(e.target.name)} }
          value={value}
        />
      </div>

      index++;

      tmpArr.push(JSX);
    }

    return tmpArr;

  }


  return (
    <section 
      className={ `sidebar ${isOpenSidebar ? '' : 'display-none'}` } 
    >

      <button 
        type='button'
        className='btn'
        onClick={setSidebar}
      >
        <AiOutlineClose className='none-link' />
      </button>

      <header className="sidebar-header">
        <h2>Filter</h2>
      </header>

      <section className="filter-container">
        {filterSection()}
      </section>

    </section>
  )
}

export default Sidebar
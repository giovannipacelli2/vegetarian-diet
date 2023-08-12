import React from 'react';
import './css/Sidebar.css';

import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = ({ filter, setFilter, setSidebar, isOpenSidebar }) => {

  const handleChange = (e) => {
    let name = e.target.name;

    setFilter(name)
  }

  const filterSection = ()=> {

    let tmpArr = [];
    let index = 0;

    // Itera filter e restituisce JSX
    for ( let item in filter ) {

      const name = item;
      const value = filter[item].value;
      const title = filter[item].title;
      
      const JSX = <div key={index} className="filter">
        <label htmlFor={name}>{title}</label>

        <input 
          type="checkbox"
          name={name} 
          id={name} 
          onChange={ handleChange }
          checked={value}
        />
      </div>

      index++;

      tmpArr.push(JSX);
    }

    // Ritorna un array con pezzi di JSX
    return tmpArr;

  }


  return (
    <section 
      className={ `${isOpenSidebar ? 'sidebar ' : 'sidebar to-right'}` } 
    >
      <header className="sidebar-header">

        <button
          type='button'
          className='btn-close'
          onClick={setSidebar}
        >
          <AiOutlineClose className='icon none-link' />
        </button>

        <h2>Filter</h2>
      </header>

      <section className="filter-container">

        <div className="line"></div>

        <div className="all-filters">
          {filterSection()}
        </div>
      </section>

    </section>
  )
}

export default Sidebar
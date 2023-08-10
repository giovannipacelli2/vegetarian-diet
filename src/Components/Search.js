import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/Search.css';

import { AiOutlineSearch } from 'react-icons/ai';

// Import dei dati dallo store
import { useSelector, useDispatch } from 'react-redux';
import { setSearched, setSearchedData } from '../actions/appReducer';

const Search = () => {

    const navigate = useNavigate();

    // Gestisce apertura e chiusura della droplist
    const [ filteredData, setFilteredData ] = useState({});

    
    /*--------------------Preleva-dati-dallo-STATE----------------------*/

    const data = useSelector( (state)=> state.appReducer.data );
    const searched = useSelector( (state)=> state.appReducer.searched );

    const dispatch = useDispatch();

    /*-----------------------LISTENERs-sul-FORM-------------------------*/
   
    const handleChange = (value)=>{
        let text = value.toLowerCase();
        dispatch(setSearched(text));

        let tmpSearchedData = data.filter( item=> item.title.toLowerCase().includes(text) );
        
        setFilteredData(tmpSearchedData);
        /* dispatch(setSearchedData(tmpSearchedData)); */
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        let input = e.target.textSearch;

        dispatch(setSearchedData(filteredData));

        dispatch(setSearched(''));

        input.blur();

        // Se c'è un solo elemento si viene reindirizzati 
        // direttamente alla pagina SingleRecipe

        if ( filteredData.length === 1 ) {
            let id = filteredData[0].id;
            navigate(`/SingleRecipe/${id}`);

            return
        }

        navigate('/result');
    };

    const handleClick = (e)=> {

        let target = e.target.closest('li');

        if (!target) return;

        handleChange(target.textContent)
    };

  return (
    <form 
        className='search'
        onSubmit={(e)=>{handleSubmit(e)}}
    >
        <input 
            type='text'
            autoComplete='off'
            placeholder='Search'
            id='textSearch'
            name='textSearch'
            onChange={(e)=>{handleChange(e.target.value)}}
            value={searched}
        />
        
        {
            (searched && filteredData.length !== 0) &&
            <div 
                className='dropmenu'
            >
                <ul className='droplist'>
                    {
                        filteredData.map((item, index)=>{
                            return (
                                <li 
                                    key={index}
                                    onClick={handleClick}
                                >{item.title}</li>
                            );
                        })
                    }
                </ul>
            </div>
        }

        <button 
            type='submit'
            className='icon-btn icon-search'
        >
            <AiOutlineSearch className='icon' />
        </button>
    </form>
        
  )
}

export default Search
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './css/Search.css';

import { AiOutlineSearch } from 'react-icons/ai';

// Import dei dati dallo store
import { useSelector, useDispatch } from 'react-redux';
import { setSearched, setSearchedData } from '../actions/appReducer';

const Search = () => {

    const inputDomElem = useRef(null);
    // Gestisce apertura e chiusura della droplist
    const [ isDropmenuOpen, setIsDropmenuOpen ] = useState(false);
    // Controlla le coordinate dell'input per la droplist
    const [ inputCoords, setInputCoords ] = useState({});

    /*--------------Funzioni-attivate-dagli-EVENT-LISTENER--------------*/

    const dropmenuOpen = ()=> {
        setIsDropmenuOpen(true);
        document.addEventListener('click', dropmenuClose);
    };

    const dropmenuClose = (e)=> {

        if ( e.target.closest('.droplist') || e.target.id === 'textSearch' ) return;

        setIsDropmenuOpen(false);
        document.removeEventListener('click', dropmenuClose);
    };

    /*--------------Refresh-input-COORDS-&-Gestione-LISTENER------------*/

    useEffect( ()=>{
        if(inputDomElem) {
            setInputCoords({
                top : inputDomElem.current.clientBottom + "px",
                left : inputDomElem.current.clientLeft + "px"
            })
        }

        inputDomElem.current.addEventListener('focus', dropmenuOpen);

        return ()=>{
            inputDomElem.current.removeEventListener('focus', dropmenuOpen);
            document.removeEventListener('click', dropmenuClose);
        }
    }, [inputDomElem] );
    
    /*--------------------Preleva-dati-dallo-STATE----------------------*/

    const data = useSelector( (state)=> state.appReducer.data );
    const searched = useSelector( (state)=> state.appReducer.searched );
    const searchedData = useSelector( (state)=> state.appReducer.searchedData );

    const dispatch = useDispatch();

    /*-----------------------LISTENERs-sul-FORM-------------------------*/

    const handleChange = (value)=>{
        let text = value.toLowerCase();
        dispatch(setSearched(text));

        let tmpSearchedData = data.filter( item=> item.title.toLowerCase().includes(text) );
        
        dispatch(setSearchedData(tmpSearchedData));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
    };

  return (
    <form className='search' onSubmit={(e)=>{handleSubmit(e)}}>
        <input 
            type='text'
            autoComplete='off'
            placeholder='Cerca'
            id='textSearch'
            name='textSearch'
            onChange={(e)=>{handleChange(e.target.value)}}
            value={searched}
            ref={inputDomElem}
        />
        
        {
            (searched && isDropmenuOpen && searchedData.length !== 0) &&
            <div 
                className='dropmenu'
                style={ inputCoords }
            >
                <ul className='droplist'>
                    {
                        searchedData.map((item, index)=>{
                            return <li key={index}>
                                <Link 
                                    className='none-link'
                                    to={`/SingleRecipe/${item.id}`}
                                    onClick={()=>{setIsDropmenuOpen(false)}}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        }

        <button 
            type='submit'
            className='icon-btn icon-search'
        >
            <Link to='/result' ><AiOutlineSearch className='icon' /></Link>
        </button>
    </form>
        
  )
}

export default Search
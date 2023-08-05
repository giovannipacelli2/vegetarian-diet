import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './css/Search.css';

import { AiOutlineSearch } from 'react-icons/ai';

// Import dei dati dallo store
import { useSelector, useDispatch } from 'react-redux';
import { setData, setDevice, setSidebar, setSearched, setSearchedData } from '../actions/appReducer';

const Search = () => {

    const inputDomElem = useRef(null);

    const [ isDropmenuOpen, setIsDropmenuOpen ] = useState(false);
    const [ inputCoords, setInputCoords ] = useState({});

    const dropmenuOpen = ()=> {
        setIsDropmenuOpen(true);
    };

    const dropmenuClose = (e)=> {

        if ( e.target.closest('.search') ) return;
        console.log(e.target)
        setIsDropmenuOpen(false);
    };

    useEffect( ()=>{
        if(inputDomElem) {
            setInputCoords({
                inputX : inputDomElem.current.clientLeft,
                inputY : inputDomElem.current.clientBottom
            })
        }

        inputDomElem.current.addEventListener('focus', dropmenuOpen);
        document.addEventListener('click', dropmenuClose);

        return ()=>{
            inputDomElem.current.removeEventListener('focus', dropmenuOpen);
            document.removeEventListener('click', dropmenuClose);
        }
    }, [inputDomElem] );
    

    const data = useSelector( (state)=> state.appReducer.data );
    const searched = useSelector( (state)=> state.appReducer.searched );
    const searchedData = useSelector( (state)=> state.appReducer.searchedData );

    const dispatch = useDispatch();

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
                style={
                    {
                        top:inputCoords.inputY + 'px',
                        left:inputCoords.inputX + 'px'
                    }
                }
            >
                <ul className='droplist'>
                    {
                        searchedData.map((item, index)=>{
                            return <li key={index}>
                                <Link className='link' to={`/SingleRecipe/${item.id}`}>
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
            <AiOutlineSearch className='icon' />
        </button>
    </form>
        
  )
}

export default Search
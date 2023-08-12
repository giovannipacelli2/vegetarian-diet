import React, { useState, useEffect } from 'react';
import './css/Search.css';

import { useNavigate } from 'react-router-dom';

import { AiOutlineSearch } from 'react-icons/ai';

// Import dei dati dallo store
import { useSelector, useDispatch } from 'react-redux';
import { setSearched, setSearchedData } from '../actions/appReducer';

const Search = () => {

    const navigate = useNavigate();

    /*----------------------Stato-del-componente------------------------*/

    const [ searchedText, setSearchedText ] = useState('');
    const [ filteredData, setFilteredData ] = useState({});

    
    /*--------------------Preleva-dati-dallo-STATE----------------------*/

    const data = useSelector( (state)=> state.appReducer.data );
    const searched = useSelector( (state)=> state.appReducer.searched );

    const dispatch = useDispatch();

    /*-------------AGGIORNA-LA-LISTA-QUANDO-I-DATI-CAMBIANO-------------*/

    useEffect(()=>{
        // Evita la ricerca quando i dati non ci sono
        if (!data) return;

        let tmpSearchedData = data.filter( item=> item.title.toLowerCase().includes(searched) );
        setFilteredData(tmpSearchedData);
        dispatch(setSearchedData(tmpSearchedData));
    }, [data]);

    /*---------------------------LISTENERs------------------------------*/
   
    const handleChange = (value)=>{
        let text = value.toLowerCase();

        // Set local-state
        setSearchedText(text);
    
        // Evita la ricerca quando i dati non ci sono
        if (!data) return;

        let tmpSearchedData = data.filter( item=> item.title.toLowerCase().includes(text) );
        
        // Set local-state
        setFilteredData(tmpSearchedData);

    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        let input = e.target.textSearch;
        let text = input.value;

        // Se il campo input è vuoto non invia il form
        if (text === '') return;

        // Set global State
        dispatch(setSearchedData(filteredData));
        dispatch(setSearched(text));

        // Svuota lo state locale
        setSearchedText('');

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
            value={searchedText}
        />
        
        {
            (searchedText && filteredData.length !== 0) &&
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
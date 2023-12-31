import React, { useEffect, useState } from 'react';
import './App.css';

//Use react-router-dom
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import SingleRecipe from './Pages/SingleRecipe';
import ResultPage from './Pages/ResultPage';
import ErrorPage from './Pages/ErrorPage';

// Components
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

// Use Redux
import { useSelector, useDispatch } from 'react-redux';
import { setData, setTopRated, setSidebar, setFilter } from './actions/appReducer';

import { useQuery } from '@tanstack/react-query';

// API Library
import { fetchData } from './api/apiFunctions';

// Utile al debug
/* const URL = 'http://localhost:4000/data'; */

const URL = 'https://api.spoonacular.com/recipes/complexSearch';


function App() {
  const stateData = useSelector( (state)=>state.appReducer.data );
  const searchedData = useSelector( (state)=>state.appReducer.searchedData );
  const filter = useSelector( (state)=>state.appReducer.filter );
  const isOpenSidebar = useSelector( (state)=>state.appReducer.isOpenSidebar );
  const dispatch = useDispatch();

  // Local State

  const [ params, setParams ] = useState({diet: "Vegetarian"});

  /*------Creazione-oggetto-da-passare-come-oggetto-'params'-----*/

  useEffect(()=>{

    let tmp = {
      diet: "Vegetarian",
    };
    // Itera tutti i filtri
    for ( let item in filter ) {

      if (filter[item].value) {

        // Query key da inviare come params
        let query = filter[item].query;
        // Valore della query key da inviare come params
        let queryValue = filter[item].queryValue;

        // Controlla se nell'oggetto che stiamo costruendo
        // C'è già quel determinato parametro

        if ( tmp[query] ) {
          tmp[query] += `, ${queryValue}`;
        } else {
          tmp = {
            ...tmp,
            [query]: queryValue
          }
        }


      }
    }

    setParams( tmp );

  }, [filter]);

  /*--------------Preleviamo-i-dati-con-React-query--------------*/

  const fetchRepositories = (params) => {
    return fetchData(URL, params);
}

  const query =  useQuery({
      queryKey: ['fetch-repo', params],
      queryFn: ()=>{return fetchRepositories(params)}
  });

  const manageSidebar = ()=> {
    dispatch(setSidebar());
  }

  /*-------------Copiamo-i-dati-ricevuti-nello-store-------------*/
  
  useEffect(()=>{
    if (query.isFetched) {
      dispatch(setData(query.data?.data?.results));
    }
  }, [query.isFetched, query.data]);

  /*----------Setta-array-vuoto-nel-caso-di-assenza-dati---------*/

  useEffect(()=>{
    if (query.isError) {
      dispatch(setData([]));
    }
  }, [query.isError]);

  /*-----------------Refetch-dati-cambio-parametri---------------*/
  
  useEffect(()=>{
    query.refetch();
  }, [params]);
  
  /*----------------Set-delle-ricette-consigliate----------------*/
  
  useEffect(() => {
    if (stateData) {

      let maxLength = stateData.length - 1;

      let rdmSet = new Set();

      if (maxLength) {
        while (rdmSet.size < 6) {

          let tmpRdm = Math.round(Math.random() * maxLength);

          // Controlla se è presente l'immagine prima di proseguire
          if (!stateData[tmpRdm]?.image) return 

          rdmSet.add(tmpRdm);
        }
      }

      let tmpRated = [];

      for (let value of rdmSet) {
        tmpRated.push(stateData[value]);
      }

      dispatch(setTopRated(tmpRated));
    }
  }, [stateData]);
  
  /*---------------------Gestione-SIDEBAR------------------------*/

  const sidebarProps = {
    filter,
    setFilter: (filterName)=>{ dispatch(setFilter(filterName)) },
    isOpenSidebar,
    setSidebar: ()=>{ dispatch(setSidebar()) },
  };

  return (
    <>
      <Navbar setSidebar={manageSidebar} />
      <Sidebar {...sidebarProps} />
      <Routes>
        <Route exact path='/' element={
          <Home query={query} />
        }/>
        <Route exact path='/SingleRecipe/:id' element={
          <SingleRecipe />
        }/>
        <Route exact path='/result' element={
          <ResultPage data={searchedData}/>
        }/>
        <Route path='*' element={
          <ErrorPage />
        }/>
      </Routes>
    </>
  );
}

export default App;

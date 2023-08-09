import React, { useEffect, useState } from 'react';
import './App.css';

//Use react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import SingleRecipe from './Pages/SingleRecipe';
import ResultPage from './Pages/ResultPage';

// Components
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

// Use Redux
import { useSelector, useDispatch } from 'react-redux';
import { setData, setTopRated, setDevice, setSidebar, setFilter } from './actions/appReducer';

import { useQuery } from '@tanstack/react-query';

// API Library
import { fetchData } from './api/apiFunctions';

const URL = 'http://localhost:4000/data';
/* const URL = 'https://api.spoonacular.com/recipes/complexSearch'; */


function App() {

  const stateData = useSelector( (state)=>state.appReducer.data );
  const searchedData = useSelector( (state)=>state.appReducer.searchedData );
  const filter = useSelector( (state)=>state.appReducer.filter );
  const isOpenSidebar = useSelector( (state)=>state.appReducer.isOpenSidebar );
  const dispatch = useDispatch();

  // Local State

  const [ params, setParams ] = useState({diet: "Vegetarian"});

  useEffect(()=>{

    let tmp = {
      diet: "Vegetarian",
    };

    for ( let item in filter ) {

      if (filter[item].value) {

        let query = filter[item].query;
        let queryValue = filter[item].queryValue;

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
      queryKey: ['fetch-repo'],
      queryFn: ()=>{return fetchRepositories(params)}
  });

  const manageSidebar = ()=> {
    dispatch(setSidebar());
  }

  /*-------------Copiamo-i-dati-ricevuti-nello-store-------------*/
  
  useEffect(()=>{
    if (query.isFetched) {
      /* dispatch(setData(query.data?.data)); */
      dispatch(setData(query.data?.data?.results));
    }
  }, [query.isFetched]);

  /*-----------------Rifetch-dati-cambio-parametri---------------*/
  
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

  /*---------------------Gestione-LOADING------------------------*/

  if (query.isLoading) return(
      <h2>Loading...</h2>
  );

  /*------------------Gestione-eventuali-errori------------------*/

  if (query.isError) return(
      <h2>{`An error has occurred: ${query.error.message}`}</h2>
  );

  return (
    <Router>
      <Navbar setSidebar={manageSidebar} />
      <Sidebar {...sidebarProps} />
      <Routes>
        <Route exact path='/' element={
          <Home />
        }/>
        <Route path='/SingleRecipe/:id' element={
          <SingleRecipe />
        }/>
        <Route path='/result' element={
          <ResultPage data={searchedData}/>
        }/>
      </Routes>
    </Router>
  );
}

export default App;

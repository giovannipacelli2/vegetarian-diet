import React, { useEffect } from 'react';
import './App.css';

//Use react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import SingleRecipe from './Pages/SingleRecipe';
import ResultPage from './Pages/ResultPage';

// Components
import Navbar from './Components/Navbar';

// Use Redux
import { useSelector, useDispatch } from 'react-redux';
import { setData, setDevice, setSidebar } from './actions/appReducer';

import { useQuery } from '@tanstack/react-query';

// API Library
import { fetchData } from './api/apiFunctions';

const URL = 'http://localhost:4000/results';


function App() {

  const dispatch = useDispatch();

  /*--------------Preleviamo-i-dati-con-React-query--------------*/

  const fetchRepositories = () => {
    /* const params = {
        diet:'Vegetarian',
    } */
    return fetchData(URL);
}

  const query = useQuery({
      queryKey: ['fetch-repo'],
      queryFn: fetchRepositories
  });

  const manageSidebar = ()=> {
    dispatch(setSidebar());
  }

  /*-------------Copiamo-i-dati-ricevuti-nello-store-------------*/
 
  useEffect(()=>{
    if (query.isFetched) {
      dispatch(setData(query.data?.data));
    }
  }, [query.isFetched]);

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
      <Routes>
        <Route exact path='/' element={
          <Home />
        }/>
        <Route path='/SingleRecipe/:id' element={
          <SingleRecipe />
        }/>
        <Route path='/result' element={
          <ResultPage />
        }/>
      </Routes>
    </Router>
  );
}

export default App;

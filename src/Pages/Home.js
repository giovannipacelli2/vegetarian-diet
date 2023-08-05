import React, { useEffect } from 'react'

import './css/Home.css';

// Use Redux
import { useSelector, useDispatch } from 'react-redux';
import { setTopRated } from '../actions/appReducer';

const Home = () => {

  // Preleviamo dallo store
  const stateData = useSelector( (state)=>state.appReducer.data );
  const topRated = useSelector( (state)=>state.appReducer.topRated );
  const dispatch = useDispatch();

  /*----------------Set-delle-ricette-consigliate----------------*/
  
  useEffect(()=>{
    if (stateData) {

      let length = stateData.length;
      let tmpRated = [];

      for ( let i = 0; i < 5; i++ ) {
        let rdm = Math.round(Math.random() * length);
        tmpRated.push(stateData[rdm]);
      }

      dispatch(setTopRated(tmpRated));
    }
  }, [stateData]);

  return (
    <section>
      home
    </section>
  )
}

export default Home
import React, { useEffect } from 'react';

import './css/Home.css';
import homeImg from '../img/page-img.jpg';

// Use Redux
import { useSelector, useDispatch } from 'react-redux';

// Componenti
import HeaderSection from '../Components/HeaderSection';
import ImgLink from '../Components/ImgLink';

const Home = () => {

  const imgStyle = {    // Imposta l'immagine nella home
    backgroundImage: `url(${homeImg})`
  };

  // Preleviamo dallo store
  const topRated = useSelector( (state)=>state.appReducer.topRated );
  const dispatch = useDispatch();

  /*----------------Set-delle-ricette-consigliate----------------*/
  

  return (
    <section className='home'>

      <div style={imgStyle} className='home-img'></div>

      <HeaderSection classlist={'header-section header-100'} />

      <section className='img-container'>
        {
          topRated.map( (item, index)=>{
            return(
              <ImgLink key={index} {...item} />
            );
          } )
        }
      </section>

    </section>
  )
}

export default Home
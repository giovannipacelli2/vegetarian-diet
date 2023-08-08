import React, { useEffect } from 'react';

import './css/Home.css';
import homeImg from '../img/page-img.jpg';

// Use Redux
import { useSelector, useDispatch } from 'react-redux';

// Componenti
import HeaderSection from '../Components/HeaderSection';
import Hero from '../Components/Hero';
import ImgLink from '../Components/ImgLink';

const Home = () => {

  // Preleviamo dallo store
  const topRated = useSelector( (state)=>state.appReducer.topRated );
  const dispatch = useDispatch();

  /*----------------Set-delle-ricette-consigliate----------------*/
  

  return (
    <section className='home'>

      <Hero cssClass={'hero home-img'} img={homeImg} />

      <HeaderSection title={'Top rated'} classlist={'header-section header-100'} />

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
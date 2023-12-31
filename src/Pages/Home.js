import React from 'react';

import './css/Home.css';
import homeImg from '../img/page-img.jpg';

// Use Redux
import { useSelector } from 'react-redux';

// Componenti
import HeaderSection from '../Components/HeaderSection';
import Hero from '../Components/Hero';
import ImgLink from '../Components/ImgLink';
import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';

const Home = ({query}) => {
  
  const { isLoading, isError, error } = query;

  // Preleviamo dallo store
  const topRated = useSelector( (state)=>state.appReducer.topRated );

  /*---------------------Gestione-errori-------------------------*/

  if ( isLoading ) {
    return <Loading />
  }
  if ( isError ) {
    return <ErrorMessage message={error.message} />
  }
  

  return (
    <section className='home'>

      <Hero cssClass={'hero home-img'} img={homeImg} />

      <HeaderSection title={'Top rated'} classlist={'header-section header-100'} />

      {
        topRated.length === 0 ? <ErrorMessage message={'No data, try to refresh the page'}/> : 
        <section className='img-container'>
          {
            topRated.map((item, index) => {
              return (
                <ImgLink key={index} {...item} />
              );
            })
          }
        </section>
      }

    </section>
  )
}

export default Home
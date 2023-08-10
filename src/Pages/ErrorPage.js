import React from 'react';
import './css/ErrorPage.css';

import ImgPage from '../img/page-img.jpg';
import Hero from '../Components/Hero';

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Hero cssClass='hero hero-error' img={ImgPage}>
        <div className="message-container">
              <h2 className='message'>Page not found</h2>
              <button className='btn btn-green'>
                  <Link to='/' className='none-link'>Torna alla home</Link>
              </button>
        </div>
    </Hero>
  )
}

export default ErrorPage
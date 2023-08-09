import React from 'react';
import './css/ResultPage.css';

import { Link } from 'react-router-dom';

// Import components
import ImgLink from '../Components/ImgLink';

const ResultPage = ({data}) => {
  
  if (data.length === 0) {
    return (
      <h2 className='message'>Nothing to see</h2>
    )
  }
  return (
    <section className="result-container">
      {
        data.map( (recipe)=>{

          const { id, title, image } = recipe;
          const props = { id, title, image };

          return <div key={id} className="single-result">
            <h2 className='title'>{ title }</h2>
            <ImgLink {...props} className='img-box' />
          </div>
        } )
      }
    </section>
  )
}

export default ResultPage
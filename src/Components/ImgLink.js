import React from 'react'
import { Link } from 'react-router-dom'

import './css/ImgLink.css';

const ImgLink = ({title, image, id}) => {
  return (
    <div className='img-link'>
        <img src={image} alt={title} />
        <button type='button' className='btn btn-green img-btn'>
            <Link 
                className='none-link' 
                to={`/SingleRecipe/${id}`}
            >Più info</Link>
        </button>
    </div>
  )
}

export default ImgLink
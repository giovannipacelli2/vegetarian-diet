import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './css/ImgLink.css';

const ImgLink = ({title, image, id}) => {

  const navigate = useNavigate();

  const goTo = ()=> {
    navigate(`/SingleRecipe/${id}`)
  };

  return (
    <div className='img-link'>
        <img src={image} alt={title} onClick={goTo}/>
        <button type='button' className='btn btn-green img-btn'>
            <Link 
                className='none-link' 
                to={`/SingleRecipe/${id}`}
            >More</Link>
        </button>
    </div>
  )
}

export default ImgLink
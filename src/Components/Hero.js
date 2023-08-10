import React from 'react'

const Hero = ({cssClass, img, children}) => {

    const imgStyle = {    // Imposta l'immagine nella home
        backgroundImage: `url(${img})`
      };

  return (
    <div style={imgStyle} className={cssClass} >
      {children}
    </div>
  )
}

Hero.defaultProps = {
    cssClass : '',
}

export default Hero
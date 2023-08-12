import React from 'react';
import './css/ErrorMessage.css';

const ErrorMessage = ({message}) => {

  return (
    <div className="error-msg-container">
      <h2 className='message'>Something went wrong:</h2>
      <h2 className='message clr-red'>{message}</h2>
      
    </div>
  )
}

ErrorMessage.defaultProps = {
  message : 'Unknown error'
}

export default ErrorMessage
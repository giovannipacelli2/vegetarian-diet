import React from 'react';
import './css/ErrorMessage.css';

const ErrorPage = ({message}) => {

  return (
    <h2 className='message'>{message}</h2>
  )
}

ErrorPage.defaultProps = {
  message : 'Something gone wrong'
}

export default ErrorPage
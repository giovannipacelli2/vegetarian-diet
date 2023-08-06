import React from 'react'

const HeaderSection = ({classlist}) => {
  return (
    <section className={`${classlist}`} >
      <h2 className='title'>Ricette consigliate</h2>
      <div className='line'></div>
    </section>
  )
}

HeaderSection.defaultProps = {
    classlist: '',
};

export default HeaderSection
import React from 'react'

const HeaderSection = ({title, classlist}) => {
  return (
    <section className={`${classlist}`} >
      <h2 className='title'>{ title }</h2>
      <div className='line'></div>
    </section>
  )
}

HeaderSection.defaultProps = {
    title: 'Title',
    classlist: '',
};

export default HeaderSection
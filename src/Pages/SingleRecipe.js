import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query';

// API Library
import { fetchData } from '../api/apiFunctions';

import './css/SingleRecipe.css';

// Import Components
import Hero from '../Components/Hero';
import HeaderSection from '../Components/HeaderSection';


const SingleRecipe = () => {
  
  const { id } = useParams();
  /* const URL = 'http://localhost:4000/664658'; */
  const URL = `https://api.spoonacular.com/recipes/${id}/information`;
  const params = {
    includeNutrition : false
  }

  const [ recipe, setRecipe ] = useState({});

  const fetchRecipe = () => {
    return fetchData(URL, params);
  }

  const query = useQuery({
    queryKey: ['fetch-recipe', id],
    queryFn: fetchRecipe
  });

  /*-------Creazione-oggetto-partendo-dai-dati-ricevuti----------*/

  const createRecipe = (data)=> {

    const ingredients = ()=>{

      const baseUrl = 'https://spoonacular.com/cdn/ingredients_100x100/';

      return data.extendedIngredients.map( (ingredient)=>{
        return {
          name: ingredient.name,
          img: ingredient.image ? `${baseUrl}${ingredient.image}` : false
        }
      } );
    };

    const steps = ()=>{
      return data.analyzedInstructions[0].steps.map( (step)=>{
        
        return {
          number: step.number,
          instruction: step.step,
          ingredients: step.ingredients ? step.ingredients.map(item=>item.name) : false
        }
      } );
    };

    return {
      id : data.id,
      title : data.title,
      image : data.image,
      time : data.readyInMinutes,
      servings : data.servings,
      glutenFree : data.glutenFree,
      lactoseFree : data.dairyFree,
      veryHealthy : data.veryHealthy,
      ingredients: ingredients(), // Array di ingredienti
      steps: steps(),
    }
  }

  /*-------Copiamo-i-dati-processati-nello-state-locale----------*/

  useEffect(() => {
    if (query.isFetched) {
      let tmpData = createRecipe(query.data?.data);
      console.log(tmpData);
      setRecipe( tmpData );
    }

    return ()=>{
      setRecipe({});
    }
  }, [query.isFetched]);


  /*----------------Composizione-JSX-dai-dati--------------------*/
  
  const infoRecipe = ()=> {

    const { time, servings, veryHealthy, glutenFree, lactoseFree } = recipe;
    const allSteps = recipe.steps.length;

    return (
      <ul className='container-list'>
        <li>{`Ready in ${time} minutes`}</li>
        <li>{`${servings} servings`}</li>
        <li>{`Very healty: ${veryHealthy ? 'yes' : 'no'}`}</li>
        <li>{`Gluten free: ${glutenFree ? 'yes' : 'no'}`}</li>
        <li>{`Lactose free: ${lactoseFree ? 'yes' : 'no'}`}</li>
        <li>{`Total steps: ${allSteps}`}</li>
      </ul>
    );
  }
  const infoIngredients = ()=> {
    return (
      <ul className='container-list'>
        {
          recipe.ingredients.map((item, index)=>{
            return <li key={index}>
              {item.name}
            </li>
          })
        }
      </ul>
    );
  }

  const stepByStep = ()=> {
    return (
      <article className='container-step'>
        {
          recipe.steps.map((item)=>{

            const { number, instruction } = item;

            return <div key={number} className='single-step'>
              <ul>
                <li><h3 className='title'>{`Step ${number}:`}</h3></li>
              </ul>
              <p className='description'>{instruction}</p>
            </div>
          })
        }
      </article>
    );
  }


  if ( query.isLoading ) {
    return <h2 className='message'>...loading</h2>
  }
  if ( query.isError ) {
    return <h2 className='message'>An error has occurred</h2>
  }
  if ( JSON.stringify(recipe) === '{}' ) {
    return <h2 className='message'>Nothing to see</h2>
  }else{
    return (
      <section className="single-page">
  
        <section className='section-top'>
          <h2 className='title'> {recipe.title} </h2>
          <Hero img={recipe.image} cssClass={'hero hero-recipe'} />
        </section>
  
        <section className='recipe-container'>
  
          <section className="info-recipe">
            <HeaderSection title='Info recipe' classlist={'header-sections'} />
            { infoRecipe() }
          </section>
  
          <section className="info-recipe">
            <HeaderSection title='Ingredients list:' classlist={'header-sections'} />
            { infoIngredients() }
          </section>
  
          <section className="info-recipe">
            <HeaderSection title='Instructions' classlist={'header-sections'} />
            { stepByStep() }
          </section>
  
        </section>
        
      </section>
    )
  }

}

export default SingleRecipe
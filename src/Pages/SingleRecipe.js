import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query';

// API Library
import { fetchData } from '../api/apiFunctions';

const URL = 'http://localhost:4000/664658';

const SingleRecipe = () => {

  const { id } = useParams();

  const [ recipe, setRecipe ] = useState({});

  const fetchRecipe = () => {
    return fetchData(URL);
  }

  const query = useQuery({
    queryKey: ['fetch-recipe'],
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
          instrucion: step.step,
          ingredients: step.ingredients ? step.ingredients.map(item=>item.name) : false
        }
      } );
    };

    return {
      id : data.id,
      title : data.title,
      time : data.readyInMinutes,
      servings : data.servings,
      glutenFree : data.glutenFree,
      lactoseFree : data.dairyFree,
      veryHealthy : data.veryHealthy,
      ingredients: ingredients(),
      steps: steps(),
    }
  }

  /*-------Copiamo-i-dati-processati-nello-state-locale----------*/

  useEffect(() => {
    if (query.isFetched) {
      setRecipe( createRecipe(query.data?.data) );
    }
  }, [query.isFetched]);


  console.log(recipe);
  return (
    <div>SingleRecipe {id}</div>
  )
}

export default SingleRecipe
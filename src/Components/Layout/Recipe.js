import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/recipes.json')
      .then(response => {
        setRecipes(response.data); // Store all recipes
      })
      .catch(error => console.error("Error fetching the recipe data:", error));
  }, []);

  if (recipes.length === 0) return <p>Loading...</p>;

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id} className='recipe'>
          <img src={recipe.image} alt={recipe.title} />
          <div className='recipeInfo'> 
            <h2>{recipe.title}</h2>
            
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>

            <h3>Cooking Steps</h3>
            <ul>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Recipe;
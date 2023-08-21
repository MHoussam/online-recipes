import React, { useState, useEffect } from 'react';
import Image from '../../base/Image';
import "../../../styles/recipedetails.css";

const RecipeDetails = () => {
  const storedRecipes = localStorage.getItem('recipes');
  const recipes = JSON.parse(storedRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const recipeId = localStorage.getItem('recipe_id');

    const foundRecipe = recipes.find(recipe => recipe.id == recipeId);

    console.log(foundRecipe)

    if (foundRecipe) {
      setSelectedRecipe(foundRecipe);
    }
  }, []);

  return (
    <div className="recipe-details-container flex">
      <div className="recipe-details-left flex center">
        {selectedRecipe && (
            <Image src={`http://localhost:8000/${selectedRecipe.image_url}`} alt={selectedRecipe.name} />
        )}
      </div>
      <div className="recipe-details-right">
          <div className="recipe-right flex column">
            <div className="name flex center">
            {selectedRecipe && (
                <h1>{selectedRecipe.name}</h1>
            )}
            </div>

            <div className="cuisine">
            {selectedRecipe && (
                <p><strong>Cuisine:</strong> {selectedRecipe.cuisine}</p>
            )}
            </div>

            <div className="ingredients">
            {selectedRecipe && (
                <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
            )}
            </div>
          </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

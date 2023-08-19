import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../Image';
import '../../../styles/recipecard.css';

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const token = localStorage.getItem('token');

    const fetchRecipes = async () => {
        try {
            const data = { token: token };
            const response = await axios.post('http://127.0.0.1:8000/api/getRecipes', data);
            console.log(token);
            setRecipes(response.data);
            console.log(response.data);
            console.log(response.data.data);            
        } catch(error) {
            console.error('Error fetching data:', error);
        }
    } 

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-container">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe.id}>
          <Image src={recipe.image_url} alt={recipe.name} />
          <h3>{recipe.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;

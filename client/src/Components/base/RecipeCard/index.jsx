import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [like, setLike] = useState("Like");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const fetchRecipes = async () => {
    try {
      const data = { token: token };
      const response = await axios.post("http://127.0.0.1:8000/api/all", data);
      setRecipes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (recipeId) => {
    try{
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/api/like", data);
      setLike(response.data);
      console.log(response.data);
    } catch(error) {
      console.log('Error Like: ' + error);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-container">
      {recipes.map((recipe) => (
        <div className="recipe-card pointer" key={recipe.id}>
          <Image
            src={`http://localhost:8000/${recipe.image_url}`}
            alt={recipe.name}
          />
          <div className="name flex center">
            <h3>{recipe.name}</h3>
          </div>

          <div className="buttons">
            <div className="like">
              <Button text={like} className={"like-btn pointer bold round"} onClick={() => handleLike(recipe.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
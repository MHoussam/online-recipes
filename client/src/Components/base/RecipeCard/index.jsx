import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [likesColor, setLikesColor] = useState('like-btn pointer bold round');
  //const [like, setLike] = useState("Like");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const fetchRecipes = async () => {
    try {
      const data = { token: token };
      const check = localStorage.getItem('recipes');

      if(check) {
        setRecipes(JSON.parse(check));
        console.log('hellooooo')
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/all", data);
        const allData = response.data;

        localStorage.setItem('recipes', JSON.stringify(allData));
        setRecipes(allData);
        console.log(allData);
        console.log('fetched');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const data = { token: token, userId: userId};
      const check = localStorage.getItem('likes');
      console.log(check)
      if(check) {
        setLikedRecipes(JSON.parse(check));
        console.log('hhhhhello')
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/liked", data);
        const allData = response.data;

        localStorage.setItem('likes', JSON.stringify(allData));
        setLikedRecipes(allData);
        console.log(allData);
        console.log('fffffetched');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }




    // setLikedRecipes = [...likedRecipes];

    // if (action === "like") {
    //   updatedLikedRecipes.push(recipeId);
    // } else {
    //   updatedLikedRecipes = updatedLikedRecipes.filter((id) => id !== recipeId);
    // }

    // localStorage.setItem("likedRecipes", JSON.stringify(updatedLikedRecipes));
    // setLikedRecipes(updatedLikedRecipes);
  }

  const handleLike = async (recipeId) => {
    try{
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/api/like", data);

      if(response.data === 'Liked') {
        const updatedLikedRecipes = [...likedRecipes, { recipe_id: recipeId }];
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
        console.log('add')
      } else {
        const updatedLikedRecipes = likedRecipes.filter((likedRecipe) => likedRecipe.recipe_id !== recipeId);
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
        console.log('remove')
      }
      console.log(response.data);
      console.log(likedRecipes)
    } catch(error) {
      console.log('Error Like: ' + error);
    }
    console.log(likedRecipes)
  }

  useEffect(() => {
    
    // setRecipes([]);
    // setLikedRecipes([])

    // const fetchData = async () => {
    //   try {
    //     const recipesData = await axios.post("http://127.0.0.1:8000/api/all", { token });
    //     const likedRecipesData = await axios.post("http://127.0.0.1:8000/api/liked", { token, userId });
  
    //     localStorage.setItem('recipes', JSON.stringify(recipesData.data));
    //     localStorage.setItem('likes', JSON.stringify(likedRecipesData.data));
  
    //     setRecipes(recipesData.data);
    //     setLikedRecipes(likedRecipesData.data);
    //     console.log('start')
    //     console.log(recipes)
    //     console.log(likedRecipes)
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
  
    fetchLikes();
    fetchRecipes();
  
    const clearLocalStorageOnExit = (e) => {
      localStorage.removeItem('recipes');
      localStorage.removeItem('likes');
    };
  
    window.addEventListener('beforeunload', clearLocalStorageOnExit);
  
    return () => {
      window.removeEventListener('beforeunload', clearLocalStorageOnExit);
    };
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
              <Button
                text={likedRecipes.some(likedRecipe => likedRecipe.recipe_id === recipe.id)
                   ? "Unlike" : "Like"}
                className={
                  likedRecipes.some(likedRecipe => likedRecipe.recipe_id === recipe.id)
                    ? "like-btn pointer bold round red"
                    : "like-btn pointer bold round"
                }
                onClick={() => handleLike(recipe.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
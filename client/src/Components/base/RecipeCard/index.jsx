import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "../Image";
import "../../../styles/recipecard.css";
import Button from "../Button";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
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
  }

  const fetchShoppingList = async () => {
    try {
      const data = { token: token, userId: userId};
      const check = localStorage.getItem('shoppingList');
      console.log(check)
      if(check) {
        setShoppingList(JSON.parse(check));
        console.log('hhhhhello')
      } else {
        const response = await axios.post("http://127.0.0.1:8000/api/shoppingList", data);
        const allData = response.data;

        localStorage.setItem('shoppingList', JSON.stringify(allData));
        setShoppingList(allData);
        console.log(allData);
        console.log('fffffetched');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleLike = async (recipeId) => {
    try{
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/api/like", data);

      if(response.data === 'Liked') {
        const updatedLikedRecipes = [...likedRecipes, { recipe_id: recipeId }];
        console.log(likedRecipes)
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
        console.log('add')
      } else {
        console.log(likedRecipes)
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

  const handleShoppingList = async (recipeId) => {
    try{
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/api/shopping", data);

      if(response.data === 'Added') {
        const updatedShoppingList = [...shoppingList, { recipe_id: recipeId }];
        console.log(shoppingList)
        localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
        setLikedRecipes(updatedShoppingList);
        console.log('add')
      } else {
        console.log(shoppingList)
        const updatedShoppingList = shoppingList.filter((shoppingList) => shoppingList.recipe_id !== recipeId);
        localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
        setShoppingList(updatedShoppingList);
        console.log('remove')
      }
      console.log(response.data);
      console.log(shoppingList)
    } catch(error) {
      console.log('Error ShoppingList: ' + error);
    }
    console.log(shoppingList)
  }

  useEffect(() => {
    fetchLikes();
    fetchRecipes();
  
    const clearLocalStorageOnExit = (e) => {
      localStorage.removeItem('recipes');
      localStorage.removeItem('likes');
      localStorage.removeItem('shoppingList');
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

          <div className="buttons flex space-between">
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

            <div className="shopping">
            <Button
                text={'ShoppingList'}
                className={
                  shoppingList.some(shoppingList => shoppingList.recipe_id === recipe.id)
                    ? "like-btn pointer bold round red"
                    : "like-btn pointer bold round"
                }
                onClick={() => handleShoppingList(recipe.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
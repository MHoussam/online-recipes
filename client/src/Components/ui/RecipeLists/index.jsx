import React, { useState, useEffect } from "react";
import "../../../styles/recipelists.css";
import SearchBar from "../SearchBar";
import RecipeCard from "../../base/RecipeCard";
import axios from "axios";
import RecipeCartModal from "../../base/CartRecipeModal";
import PostModal from "../../base/PostModal";
import Button from "../../base/Button";

const RecipeLists = ({ isModalOpen, setIsModalOpen }) => {
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [recipeContent, setRecipeContent] = useState([
    {
      publisher_id: "",
      name: "",
      cuisine: "",
      ingredients: "",
      image_url: "",
    },
  ]);
  //const [likesColor, setLikesColor] = useState('like-btn pointer bold round');
  //const [like, setLike] = useState("Like");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  const fetchRecipes = async () => {
    try {
      const data = { token: token };
      const check = localStorage.getItem("recipes");

      if (check) {
        setRecipes(JSON.parse(check));
        //console.log("hellooooo");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/all",
          data
        );
        const allData = response.data;

        localStorage.setItem("recipes", JSON.stringify(allData));
        setRecipes(allData);
        //e.log(allData);
        //console.log("fetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const data = { token: token, userId: userId };
      const check = localStorage.getItem("likes");
      //console.log(check);
      if (check) {
        setLikedRecipes(JSON.parse(check));
        //console.log(likedRecipes);
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/liked",
          data
        );
        const allData = response.data;

        localStorage.setItem("likes", JSON.stringify(allData));
        setLikedRecipes(allData);
        //console.log(allData);
        //console.log("fffffetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchShoppingList = async () => {
    try {
      const data = { token: token, userId: userId };
      const check = localStorage.getItem("shoppingList");
      //console.log(check);
      if (check) {
        setShoppingList(JSON.parse(check));
        //console.log("hhhhhello");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/getShoppings",
          data
        );
        const allData = response.data;

        localStorage.setItem("shoppingList", JSON.stringify(allData));
        setShoppingList(allData);
        //console.log(allData[0].recipe.cuisine);

        allData.map((item) => {
          setRecipeContent((prev) => [
            ...prev,
            {
              publisher_id: item.recipe.publisher_id,
              name: item.recipe.name,
              cuisine: item.recipe.cuisine,
              ingredients: item.recipe.ingredients,
              image_url: item.recipe.image_url
            },
          ]);
        });
        //console.log("fffffetched");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (recipeId) => {
    try {
      const data = { token: token, recipeId: recipeId, userId: userId };
      const response = await axios.post("http://127.0.0.1:8000/api/like", data);

      if (response.data.message === "Liked") {
        const updatedLikedRecipes = [...likedRecipes, response.data.data];
        //console.log(likedRecipes);
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
        //console.log("add");
      } else {
        //console.log(likedRecipes);
        const updatedLikedRecipes = likedRecipes.filter(
          (likedRecipe) => likedRecipe.recipe_id !== recipeId
        );
        localStorage.setItem("likes", JSON.stringify(updatedLikedRecipes));
        setLikedRecipes(updatedLikedRecipes);
        //console.log("remove");
      }
      //console.log(response.data);
      //console.log(likedRecipes);
    } catch (error) {
      console.log("Error Like: " + error);
    }
    //console.log(likedRecipes);
  };

  const handleShoppingList = async (recipeId) => {
    try {
      const data = { token: token, recipeId: recipeId, userId: userId };
      //console.log(data);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/shopping",
        data
      );

      const allData = response.data;
      //console.log(allData.data[0]);
       if (allData.message === "Added") {

        const updatedShoppingList = [...shoppingList, allData.data[0]];
          setRecipeContent((prev) => [...prev, updatedShoppingList]);

        //   localStorage.setItem("shoppingList", JSON.stringify(allData));
        // setShoppingList(allData);
        // console.log(allData[0].recipe.cuisine);
        // console.log(allData.data[0]);
        // console.log(shoppingList);
        localStorage.setItem("shoppingList", JSON.stringify([...shoppingList, allData.data[0]]));
        setShoppingList([ ...shoppingList, allData.data[0] ]);
      //   //console.log("add");       
      } else {
      //   //console.log(shoppingList);
        const updatedShoppingList = shoppingList.filter(
          (shoppingList) => shoppingList.recipe_id !== recipeId
        );
        localStorage.setItem("shoppingList", JSON.stringify(updatedShoppingList));
        setShoppingList(updatedShoppingList);
        //console.log("remove");
      }
      //console.log(response.data);
      //console.log(shoppingList);
    } catch (error) {
      console.log("Error ShoppingList: " + error);
    }
    //console.log(shoppingList);
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  useEffect(() => {
    fetchLikes();
    fetchRecipes();
    fetchShoppingList();

    const clearLocalStorageOnExit = (e) => {
      localStorage.removeItem("recipes");
      localStorage.removeItem("likes");
      localStorage.removeItem("shoppingList");
    };

    window.addEventListener("beforeunload", clearLocalStorageOnExit);

    return () => {
      window.removeEventListener("beforeunload", clearLocalStorageOnExit);
    };
  }, []);

  //console.log(shoppingList);

  //console.log(likedRecipes);
  //console.log(recipes);

  //console.log("here");
  //console.log(shoppingList);
  return (
    <div className="content">
      <div className="search-post flex">
        <div className="search width-90">
          <SearchBar recipes={recipes} />
        </div>

        <div className="post width-10 flex center">
          <div className="post-btn">
            <Button text={'Post'} onClick={openPostModal} className={'button pointer posting'} />
          </div>
        </div>
      </div>

      <div className="recipes">
        <div className="recipe-container">
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              <RecipeCard
                recipe={recipe}
                likedRecipes={likedRecipes}
                shoppingList={shoppingList}
                handleLike={() => handleLike(recipe.id)}
                handleShoppingList={() => handleShoppingList(recipe.id)}
              />
            </div>
          ))}
          <RecipeCartModal
            isOpen={isModalOpen}
            onClose={closeModal}
            shoppingList={shoppingList}
          />

          <PostModal
            isOpen={isPostModalOpen}
            onClose={closePostModal}
            setRecipes={setRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeLists;

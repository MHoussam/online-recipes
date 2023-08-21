import React, { useState } from "react";
import Button from "../Button";
import axios from "axios";
import "../../../styles/postmodal.css";

const PostModal = ({ isOpen, onClose, recipes, setRecipes }) => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("id");
  const [data, setData] = useState({
    name: "",
    cuisine: "",
    ingredients: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setData({
        ...data,
        [name]: files[0],
      });
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const handlePost = async (e) => {

    console.log('images/' + data.image.name)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cuisine", data.cuisine);
    formData.append("ingredients", data.ingredients);
    formData.append("image", 'images/' + data.image.name);
    formData.append("token", token);
    formData.append("user_id", user_id);
    //console.log(formData['name'])

    try {

        //console.log(formData)
      const response = await axios.post("http://127.0.0.1:8000/api/post", formData);
      console.log(response.data)
      console.log(response.data.data)
console.log(response.data.message)
      if (response.data.message === "Posted") {
        console.log("data:");
        console.log(data);
        const updatedRecipes = [...recipes, response.data.data];
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
      } else {
        console.log("Didn't Post");
      }
    } catch (error) {
      console.log(error);
    }
    setData({ name: "", cuisine: "", ingredients: "", image: null });
  };

  return (
    <div className={`${isOpen ? "opened" : "closed"}`}>
        <div className="post-form-container">
            <div className="form-title flex center">
                <div className="title-text width-100">
                    <h2>Add a New Recipe</h2>
                </div>
                
                <div className="close-btn flex end width-100">
                    <Button
                        text={"Close"}
                        className="button close-button"
                        onClick={onClose}
                    />
                </div>
            </div>

            <div className="recipe-form flex column">
                <div className="name margin-btm">
                    <label className="bold">Recipe Name</label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        className="name-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="cuisine margin-btm">
                    <label className="bold">Cuisine</label>
                    <input
                        type="text"
                        name="cuisine"
                        value={data.cuisine}
                        className="cuisine-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="ingredients margin-btm">
                    <label className="bold">Ingredients</label>
                    <textarea
                        name="ingredients"
                        value={data.ingredients}
                        className="ingredients-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="image margin-btm">
                    <label className="bold">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="image-input"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="submit flex center">
                    <Button
                        text={"Post"}
                        className={"button post-submit-btn pointer"}
                        onClick={handlePost}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default PostModal;
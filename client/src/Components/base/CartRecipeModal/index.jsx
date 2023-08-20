import React, { useState } from "react";
import RecipeCard from "../RecipeCard";
import Button from "../Button";
import "../../../styles/cartrecipemodal.css";

const RecipeCartModal = ({ isOpen, onClose, shoppingList }) => {

  console.log("open?");
  console.log(isOpen);
  console.log(shoppingList);
  return (
    <div className={`${isOpen ? "modal-content" : "modal"}`}>
      <div className="close-btn flex end width-100">
        <Button
          text={"Close"}
          className="button close-button"
          onClick={onClose}
        />
      </div>
      {shoppingList.map((shoppingList) => (
        <h1 key={shoppingList.id} >{shoppingList.id}</h1>
      ))}
    </div>
  );
};

export default RecipeCartModal;
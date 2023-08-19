import React from 'react';
import '../../../styles/recipelists.css';
import SearchBar from '../SearchBar';
import RecipeCard from '../../base/RecipeCard';

const RecipeLists = () => {
  return (
    <div className='content'>
      <div className="search">
        <SearchBar />
      </div>

      <div className="recipes">
        <RecipeCard />
      </div>
    </div>
  )
}

export default RecipeLists;
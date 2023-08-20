import React, { useState } from 'react';
import RecipeLists from '../../Components/ui/RecipeLists';
import NavBar from '../../Components/ui/NavBar';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
        <NavBar setIsModalOpen={setIsModalOpen} />
        <RecipeLists isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

export default Home;
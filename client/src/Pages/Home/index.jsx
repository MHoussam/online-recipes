import React from 'react';
import RecipeLists from '../../Components/ui/RecipeLists';
import NavBar from '../../Components/ui/NavBar';

const Home = () => {
    //const [user, setUser] = useState([]);

  return (
    <div>
        <NavBar />
        <RecipeLists />
    </div>
  )
}

export default Home;
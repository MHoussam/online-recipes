import React from 'react';
import '../../../styles/navbar.css';
import logoImage from '../../../assets/images/tastybites.png';
import cartImage from '../../../assets/images/cart1.png';
import Button from '../../base/Button';
import Image from '../../base/Image';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // axios.get('127.0.0.1:8000/api/logout');
        navigate('/');
    }

  return (
    <div className='navbar flex space-between'>
        <div className="logo flex center">
            <Image src={logoImage} alt={'TastyBites Logo'} className={'logoPic'} />
        </div>

        <div className="navbar-right width-10 flex">
            <div className="cart-icon flex center pointer">
                <Image src={cartImage} alt={'Cart'} className={'cartPic'} />
            </div>

            <div className="logout-btn flex center">
                <Button text={'Logout'} onClick={handleLogout} className={"button pointer bold"} />
            </div>
        </div>
    </div>
  )
}

export default NavBar;
//import { useState } from "react";
import axios from "axios";
import "../../../styles/loginForm.css";
import "../../../styles/utilities.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Image from "../../base/Image";
import logoImage from "../../../assets/images/tastybites.png";
import Button from "../../base/Button";

const LoginForm = ({ setUser }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", data);
      console.log(response.data);
      localStorage.setItem("id", response.data.data.id);
      localStorage.setItem("first_name", response.data.data.first_name);
      localStorage.setItem("token", response.data.data.token);
      setData({ email: "", password: "" });
      
      if (response.data.token !== null) {
        navigate("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="login-container">
        <div className="form-container">
        <div className="logo flex center">
          <Image src={logoImage} alt="Tasty Bites Logo"className="logoPhoto flex column center" />
        </div>
          <h2>Login</h2>
          <div className="input">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              className="email-input"
              onChange={handleDataChange}
            />
          </div>
          <div className="input">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              className="password-input"
              onChange={handleDataChange}
            />
          </div>
          <div className="login">
            <Button text={'Login'} className="login-btn bold" onClick={handleSubmit} />
          </div>
          <div className="register-link">
            Don't have an account?
            <a onClick={handleRegister}> Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
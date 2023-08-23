import { useState } from "react";
import axios from "axios";
import "../../../styles/loginForm.css";
import "../../../styles/utilities.css";
import { useNavigate } from "react-router-dom";
import Image from "../../base/Image";
import logoImage from "../../../assets/images/tastybites.png";
import Button from "../../base/Button";
const RegisterForm = ({ setUser }) => {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", data);
      console.log(response.data);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("first_name", response.data.name);
      localStorage.setItem("token", response.data.token);
      setData({ fname: "", lname: "", email: "", password: "" });

      if (response.data.token !== null) {
        navigate("/Home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="login-container">
        <div className="form-container">
        <div className="logo flex center">
          <Image src={logoImage} alt="Tasty Bites Logo"className="logoPhoto flex column center" />
        </div>
          <h2>Register</h2>
          <div className="input">
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={data.name}
              className="fname-input"
              onChange={handleDataChange}
            />
          </div>
          <div className="input">
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={data.username}
              className="lname-input"
              onChange={handleDataChange}
            />
          </div>
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
            <Button text={'Register'} className="login-btn bold" onClick={handleSubmit} />
          </div>
          <div className="register-link">
            Already have an account?
            <a onClick={handleLogin}> Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
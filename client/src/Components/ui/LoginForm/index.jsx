//import { useState } from "react";
import axios from "axios";
import "../../../styles/loginForm.css";
import "../../../styles/utilities.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LoginForm = ({setUser}) =>{
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const handleDataChange = (e)=>{
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = async ()=>{
    try{
      const response = await axios.post("http://localhost:8000/api/login", data)
      console.log(response.data)
      localStorage.setItem('id', response.data.id)
      localStorage.setItem('name', response.data.name)      
      localStorage.setItem('token', response.data.token)
      setData({email: '', password: ''})
      if(response.data.token !== null) {
        navigate("/Home");
      }
    }catch(e){
      console.log(e)
    }
  }

  const handleRegister = ()=>{
    navigate("/Register");
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="addForm flex center">
        <div className="contactForm_container flex column">
          <div className="logo flex center">
          </div>
          <div className="names column flex center">
            <div className="fname flex column width-50">
              <label for="first_name"><span className="bold">Email:</span></label>
              <input name="email" className="first_name padding" placeholder="Email" value={data.first_name} onChange={handleDataChange}/>
            </div>
            <div className="lname flex column width-50">
              <label for="last_name"><span className="bold">Password</span></label>
              <input name="password" className="padding" placeholder="Password" type="password" value={data.last_name} onChange={handleDataChange}/>
            </div>
          </div>
          
          <div className="btn flex column">
            <div className="flex center">
              <button className="add-contact-btn bold pointer" onClick={handleSubmit}>Login</button>
            </div>

            <br/>
            
            <div className="flex center">
            <div>Don't have an account? <a className="login-link" onClick={handleRegister}>Register</a></div>
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default LoginForm;
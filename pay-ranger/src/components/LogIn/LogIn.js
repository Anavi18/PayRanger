import React, { useState } from "react";
import "./login.css";



export default function LogIn({ changeRoute, loadUser }) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
  
    const onUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const onPasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
    const handleErrrors = (res) => {
      if (!res.ok){
        alert("Incorrect Username/Password");
        throw Error(res.statusText)
      }
      else{
        return res.json();
      }
      }
  
    const onSubmitSignIn = () => {
      if(username.length === 0 || password.length === 0){
        alert("Missing field")
      }
      else{
        loadUser({
          username: username,
          password: password
        });
        changeRoute(3);
      }
    }
  
    return (
      <div className="login_wrapper">
        <div id = "cover" className="login">
          <h1 id="welcome_back">User Login</h1>
          <div>
            <input
              type="text"
              placeholder="Username"
              onChange={onUsernameChange}
              className="username"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              className="password"
            />
          <div>
          </div>
            <button className="col-6 loginButton" >
              Sign In
            </button>
            <button className="col-6 regButton" >
                Register
            </button>
    
          </div>
          
          <a href="#" className="forgotPassword">Forgot password?</a>
        </div>
      </div>
    );
  }
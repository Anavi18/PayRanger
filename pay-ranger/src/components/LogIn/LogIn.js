import React, { useState } from "react";
import "./LogIn.css";
import { BrowserRouter, Route, Link } from "react-router-dom";


function ForgotPassword() {
  return (
    <div className="wait ">Please contact admin at payranger@duckcreek.com!</div>
  )
}
export default function LogIn() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [forgotPassword, showForgotPassword] = useState(false);

    const onUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const onPasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const onForgotPasswordClick = (event) => {  
      showForgotPassword(true);
    };
  
    return (
      <div className="login_wrapper">
            <div className="loginFlexbox justify-content-center align-items-center ">
              <h1>Login</h1>
              <div className="ip">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={onUsernameChange}
                  />
              </div>

              <div className="ip">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={onPasswordChange}
                />
              </div>
            
              <Link to="/home"><button className="loginButton">Login</button></Link>
           
              <div className="mt-4 ">
                <a href="#" class= "forgotpw" onClick={onForgotPasswordClick}>Forgot password?</a>
              </div>
              <div className="mt-3">{forgotPassword && <ForgotPassword/>}</div>
            </div>  
          
          
        
      </div>
    );
  }
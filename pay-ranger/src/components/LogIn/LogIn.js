import React, { useState } from "react";
import "./LogIn.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../LoginContext";
<<<<<<< HEAD
=======
import Header from "../Header/Header";

>>>>>>> newScheme

function ForgotPassword() {
  return (
    <div className="wait ">Please contact admin at payranger@duckcreek.com!</div>
  )
}
export default function LogIn() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [forgotPassword, showForgotPassword] = useState(false);
    let loginPair = useContext(LoginContext);
<<<<<<< HEAD
    console.log(loginPair);
=======
>>>>>>> newScheme
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
      <div className="loginbg">
      <div className="login_wrapper">
<<<<<<< HEAD
        <div id = "cover" className="login">
          <div className="loginFlexbox">
            <h1 id="welcome_back">Welcome</h1>
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
            </div>
            <div className="buttonFlexbox">
                <div><Link to="/home"><button className="loginButton" onClick={()=>{loginPair.setIsLoggedIn(current=>!current)}}>Log In</button></Link></div>
                {/*<div><button className="regButton">Register</button></div>*/}
            </div>
            <div>
               <a href="#" className="forgotPasswordLink" onClick={onForgotPasswordClick}>Forgot password?</a>
           </div>
           <div>
           </div>
          </div>  
        </div>
        <div className={forgotPassword ? "forgotPassword forgotPasswordExpanded" : "forgotPassword"}>{forgotPassword && <ForgotPassword/>}</div>
=======
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
            
              <Link to="/home"><button className="loginButton"  onClick={()=>{loginPair.setIsLoggedIn(current=>!current)}}>Login</button></Link>
           
              <div className="mt-4 ">
                <a href="#" class= "forgotpw" onClick={onForgotPasswordClick}>Forgot password?</a>
              </div>
              <div className="mt-3">{forgotPassword && <ForgotPassword/>}</div>
            </div>  
          
          
        
>>>>>>> newScheme
      </div>
      </div>  
    );
  }
import React, { useState } from "react";
import "./LogIn.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../../LoginContext";

function ForgotPassword() {
  return (
    <div class="wait">If you forgot your password, please contact admin at payranger@duckcreek.com.</div>
  )
}
export default function LogIn({ changeRoute, loadUser }) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [forgotPassword, showForgotPassword] = useState(false);
    let loginPair = useContext(LoginContext);
    console.log(loginPair);
    const onUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const onPasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const onForgotPasswordClick = (event) => {  
      showForgotPassword(current=>!current);
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
      </div>
    );
  }
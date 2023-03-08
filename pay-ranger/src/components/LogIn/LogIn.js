import React, { useState } from "react";
import "./LogIn.css";



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
          <div className="loginFlexbox">
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
            <div>
              Ipsum et qui impedit officiis. Quaerat voluptas explicabo consequatur doloribus nostrum a. Voluptate fugiat dolore qui officiis minus. Voluptatem omnis quia laboriosam voluptates eveniet tenetur dolor numquam.
            </div>
            
            
             
          </div>  
          <a href="#" className="forgotPassword">Forgot password?</a>
        </div>
      </div>
    );
  }
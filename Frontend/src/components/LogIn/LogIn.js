import React, { useState} from "react";
import "./LogIn.css";
import Cookies from "js-cookie";




function ForgotPassword() {
  return (
    <div className="wait ">Please contact admin at payranger@duckcreek.com!</div>
  )
}

export default function LogIn(props) {

    Cookies.remove("isLoggedIn")
    Cookies.remove("userLoggedIn")
   
    const {handleLogin, email, password, setUsername, setPassword} = props
   
    const [forgotPassword, showForgotPassword] = useState(false);
    




   
    const onUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const onPasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const onForgotPasswordClick = (event) => {  
      showForgotPassword(true);
    };

    const keyHandler = (event) => {
      //console.log(event.key == 'Enter')
      //return event.key == 'Enter'
      if (event.key == 'Enter') {handleLogin()}
    }
  
    return (
      <div className="loginbg">
      <div className="login_wrapper">
            <div className="loginFlexbox justify-content-center align-items-center ">
              <h1>Login</h1>
              <div className="ip">
                <input
                    type="text"
                    placeholder="Username"
                    onChange={onUsernameChange}
                    onKeyDown={keyHandler}
                  />
              </div>

              <div className="ip">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={onPasswordChange}
                  onKeyDown={keyHandler}
                />
              </div>
            
              <button className="loginButton"  onClick={handleLogin}>Login</button>
           
              <div className="mt-4 ">
                <a href="#" class= "forgotpw" onClick={onForgotPasswordClick}>Forgot password?</a>
              </div>
              <div className="mt-3">{forgotPassword && <ForgotPassword/>}</div>
            </div>  
          
          
        
      </div>
      </div>  
    );
  }
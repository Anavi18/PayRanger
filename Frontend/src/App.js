import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import "./App.css";
import Header from "./components/Header/Header.js";
import Home from "./components/HomePage/Home.js";
import LogIn from "./components/LogIn/LogIn";
import EnterTime from "./components/EnterTime/EnterTime";
import ViewPayroll from "./components/ViewPayroll";
import ViewEmployees from "./components/ViewEmployee/ViewEmployees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginProvider } from "../src/components/LogIn/LoginContext";
import { DropdownContext, DropdownProvider } from "./DropdownContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Body() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let dropdownPair = useContext(DropdownContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInUser, setLogInUser] = useState({});

  useEffect(() => {
    const isLoggedInCookie = Cookies.get("isLoggedIn");
    if (isLoggedInCookie === "true") {
      setIsLoggedIn(true);
      const userLoggedIn = Cookies.get("userLoggedIn");
      setLogInUser(JSON.parse(userLoggedIn));
    } else {
      Cookies.remove("userLoggedIn");
      Cookies.remove("isLoggedIn");
      setIsLoggedIn(false);
      setLogInUser({});
    }
  }, []);

  const handleLogin = async () => {
    console.log(username)
    console.log(password)
    const response = await fetch("http://localhost:8082/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    if (response.ok) {
      setIsLoggedIn(true);
      Cookies.set("isLoggedIn", "true");

      setLogInUser(user);

      Cookies.set("userLoggedIn", JSON.stringify(user));
      navigate("/Home");

      

      // set user context to authenticated
    } else {
      alert("Login or password is incorrect. If you forgot your password, contact your administrator.")
    }
  };

  return (
    <div className="App">
      <Header
        user={logInUser}
        setUser={setLogInUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUsername = {setUsername}
        setPassword = {setPassword}
      />
      <Routes>
        <Route
          path="/"
          element={
            <LogIn
              handleLogin={handleLogin}
              email={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="/home"
          element={<Home user={logInUser} setUser={setLogInUser} />}
        />
        <Route path="/enter-time" element={<EnterTime user={logInUser} />} />
        <Route path="/payroll" element={<ViewPayroll user={logInUser} />} />
        <Route path="/employee" element={<ViewEmployees user={logInUser}  />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <DropdownProvider>
          <Body />
        </DropdownProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;

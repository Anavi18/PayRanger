import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import Home from './components/HomePage/Home.js'
import LogIn from './components/LogIn/LogIn';
import EnterTime from './components/EnterTime/EnterTime';
import ViewPayroll from './components/ViewPayroll';
import ViewEmployees from './components/ViewEmployee/ViewEmployees'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginProvider} from '../src/components/LogIn/LoginContext';
import { DropdownContext, DropdownProvider } from './DropdownContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Body() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let dropdownPair = useContext(DropdownContext);

  const [logInUser, setLogInUser] = useState(null);


  const handleLogin =  async () => {
    
    const response = await fetch("http://localhost:8082/login", {
      method: 'POST',
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const user = await response.json();
    if (response.ok) {
    
      setLogInUser(user)
      navigate("/Home")
     
      // set user context to authenticated
    } else {
      console.log("Incorrect username or password")
      
   
    }
  };

  return (
      <div className="App">
        <Header user = {logInUser}/>
        <Routes>
          <Route path="/" element={<LogIn handleLogin = {handleLogin} email = {username} password = {password} setUsername = {setUsername} setPassword = {setPassword} />}/>
          <Route path="/home" element={<Home user = {logInUser}/>}/>
          <Route path="/enter-time" element={<EnterTime/>}/>
          <Route path="/payroll" element={<ViewPayroll/>}/>
          <Route path="/employee" element={<ViewEmployees/>}/>
        </Routes>
      </div>
  );
}

function App() {
  return ( 
    <BrowserRouter>
      <LoginProvider>
        <DropdownProvider>
            <Body/>
        </DropdownProvider>
      </LoginProvider>
    </BrowserRouter>
    
  );
}

export default App;
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
import {LoginProvider} from './LoginContext';
import { DropdownContext, DropdownProvider } from './DropdownContext';
import { useContext } from 'react';

function App() {
  return ( 
  <div className="App">
      <div className="imgShadow">
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
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
import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import Home from './components/HomePage/Home.js'
import LogIn from './components/LogIn/LogIn';
import EnterTime from './components/EnterTime';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LoginProvider} from './LoginContext';
import { DropdownContext, DropdownProvider } from './DropdownContext';
import { useContext } from 'react';

function Body() {
  let dropdownPair = useContext(DropdownContext);
  return (
    <div className="imgShadow" onClick={()=>dropdownPair.toggleDropdown(current => false)}>
              <div className="App">
                <Header/>
                <Routes>
                  <Route path="/" element={<LogIn/>}/>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/enter-time" element={<EnterTime/>}/>
                </Routes>
              </div>
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
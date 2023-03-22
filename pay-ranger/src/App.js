import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/LogIn/LogIn"
import Home from "./components/HomePage/Home"

function App() {
  return ( 
  <div className="App">
      <div className="imgShadow">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
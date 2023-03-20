import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./Layout";
import Login from "./components/LogIn/LogIn"

function App() {
  return ( 
  <div className="App">
      <div className="imgShadow">
        <Home />
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
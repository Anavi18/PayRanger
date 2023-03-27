import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import Home from './components/HomePage/Home.js'
import LogIn from './components/LogIn/LogIn';
import {BrowserRouter, Routes, Route} from "react-router-dom";

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
  </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
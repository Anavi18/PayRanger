import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import Home from './components/HomePage/Home.js'
import LogIn from './components/LogIn/LogIn';
import EnterTime from './components/EnterTime';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return ( 
  <div className="imgShadow">
    <div className="App">
      <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/enter-time" element={<EnterTime/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
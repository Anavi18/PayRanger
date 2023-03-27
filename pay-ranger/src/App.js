import logo from './logo.svg';
import ReactDOM from "react-dom";
import './App.css';
import Header from './components/Header/Header.js';
import Home from './components/HomePage/Home.js'
import EnterTime from './components/EnterTime.js'

function App() {
  return ( 
  <div className="App">
      <div className="imgShadow">
        <EnterTime/>
        <Home />
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
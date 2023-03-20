import logo from './logo.svg';
import './App.css';
import Login from './components/LogIn/LogIn.js';
import Header from './components/Header/Header.js';
import Home from './components/HomePage/Home.js'

function App() {
  return ( 
  <div className="App">
      <div className="imgShadow">
        <Home />
        <Header />
        <Login />
        
      </div>
  </div>
  );
}

export default App;

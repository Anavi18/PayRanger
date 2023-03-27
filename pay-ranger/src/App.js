import logo from './logo.svg';
import './App.css';
import Login from './components/LogIn/LogIn.js';
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
        <Login />
        
      </div>
  </div>
  );
}

export default App;

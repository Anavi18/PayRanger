import logo from "./logo.svg";
import ReactDOM from "react-dom";
import "./App.css";
import Header from "./components/Header/Header.js";
import Home from "./components/HomePage/Home.js";
import LogIn from "./components/LogIn/LogIn";
import EnterTime from "./components/EnterTime/EnterTime";
import ViewEmployee from "./components/ViewEmployee/ViewEmployees";
import ViewPayroll from "./components/ViewPayroll";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/entertime" element={<EnterTime />} />
          <Route path="/payroll" element={<ViewPayroll />} />
          <Route path="/employee" element={<ViewEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));

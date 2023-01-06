import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myCSS.css";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import MainMenu from "./components/MainMenu";
import Communication from "./components/Communication";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Welcome from "./components/Welcome";
import Test from "./components/Test";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Connect from "./pages/Connect";

function App() {
  return (
    <div className="App">
      <Connect />
    </div>
  );
}

export default App;

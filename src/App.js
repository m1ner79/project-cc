import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  
import Navigation from './components/Navigation';
import Login from './components/Login';
import MainMenu from './components/MainMenu';
import Communication from './components/Communication';

function App() {
  return (
    <div className='App'>
      <Navigation/>
      <MainMenu/>
      <Communication/>
      <Login/>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthDetails } from './components/AuthDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthDetails>
    <React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthDetails>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./customStyle.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthDetails} from "./components/AuthDetails";
import Connect from "./pages/Connect";
import AddChild from "./components/AddChild";

function App() {

  const {loggedUser} = useContext(AuthDetails);
  
  const AuthRoute = ({children}) =>{
      if(loggedUser){
        return children;
      }else{
        return <Navigate to="/login" />;
      }
  };

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>

      <Route path="/connect">
          <Route 
            index
            element={
              <AuthRoute>
                <Connect />
              </AuthRoute>
            } 
          />
      </Route>
      <Route path="/addchild">
          <Route 
            index
            element={
              <AuthRoute>
                <AddChild />
              </AuthRoute>
            } 
          />
      </Route>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;

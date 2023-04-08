import React, {useContext} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import "./customStyle.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {AuthDetails} from "./components/AuthDetails";
import Connect from "./pages/Connect";
import AddChild from "./components/AddChild";
import UpdateChild from "./components/UpdateChild";
import {updateDoc, doc} from "firebase/firestore";
import {db} from "./firebase";
import DailyReview from "./components/DailyReview";
import Archive from "./components/Archive";
import ForgotPassword from "./components/ForgotPassword";

function App() {
    const {loggedUser} = useContext(AuthDetails);

    const AuthRoute = ({children, allowedRoles}) => {
        if (loggedUser && allowedRoles.includes(loggedUser.userRole)) {
            return children;
        } else if (loggedUser) {
            return <Navigate to="/connect"/>;
        } else {
            return <Navigate to="/login"/>;
        }
    };

    const updateChild = async (updatedChild) => {
        try {
            const childRef = doc(db, "children", updatedChild.id);
            await updateDoc(childRef, updatedChild);
        } catch (error) {
            console.error("Error updating child: ", error);
        }
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <AuthRoute allowedRoles={["manager", "staff"]}>
                            <Home/>
                        </AuthRoute>
                    }
                />
                <Route path="/forgotpassword" element={<ForgotPassword/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route
                    path="/connect"
                    element={
                        <AuthRoute allowedRoles={["parent", "manager", "staff"]}>
                            <Connect/>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/addchild"
                    element={
                        <AuthRoute allowedRoles={["manager", "staff"]}>
                            <AddChild/>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/update/:id"
                    element={
                        <AuthRoute allowedRoles={["manager", "staff"]}>
                            <UpdateChild onUpdate={updateChild}/>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/daily-review/:id"
                    element={
                        <AuthRoute allowedRoles={["manager", "staff"]}>
                            <DailyReview/>
                        </AuthRoute>
                    }
                />
                <Route
                    path="/archive"
                    element={
                        <AuthRoute allowedRoles={["manager", "staff"]}>
                            <Archive/>
                        </AuthRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

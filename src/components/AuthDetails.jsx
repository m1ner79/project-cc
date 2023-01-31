import { useEffect, useState, createContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthDetails = createContext();

export const AuthInfo = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    //listening in real time
    const checkStatus = onAuthStateChanged(auth, (user) => {
      setLoggedUser(user);
      console.log(user);
    });
    // clean up function to prevent memory leaking
    return () => {
      checkStatus();
    };
  }, []);

  return (
    <AuthDetails.Provider value={{ loggedUser }}>
      {children}
    </AuthDetails.Provider>
  );
};

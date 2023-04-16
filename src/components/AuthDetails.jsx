/*
@author Michal Gornicki
@Start Date 04/12/2022
*/
import {useEffect, useState, createContext} from "react";
import {auth, db} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";


export const AuthDetails = createContext();

export const AuthInfo = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        //listening in real time
        const checkStatus = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const {userRole, displayName, email, photoURL} = userDoc.data();
                    setLoggedUser({uid: user.uid, userRole, displayName, email, photoURL});
                }
            } else {
                setLoggedUser(null);
            }
        });
        // clean up function to prevent memory leaking
        return () => {
        };
    }, []);

    return (
        <AuthDetails.Provider value={{loggedUser}}>
            {children}
        </AuthDetails.Provider>
    );
};

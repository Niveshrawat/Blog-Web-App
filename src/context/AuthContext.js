import { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

// creating context
export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    // creating an empty object for storing login user
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // if user is login then setCurrentUser to user
        const unsub = onAuthStateChanged(auth, (user) => {
            user ? setCurrentUser(user) : setCurrentUser(null);
        });

        return () => {
            unsub();
        };
        
    }, []);


    return (
        <AuthContext.Provider value={currentUser} >
            {children}
        </AuthContext.Provider>
    );

}

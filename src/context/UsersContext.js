import { collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect, createContext } from "react";
import { db } from "../firebase-config";

// creating context
export const UsersContext = createContext();


export const UsersContextProvider = ({ children }) => {

    // creating an empty object for storing users data
    const [users, setUsers] = useState([]);
    const colRef = collection(db, "users");

    //! Fetching data of all users
    useEffect(() => {
        const unsub = onSnapshot(colRef, snapshot => {
            setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        });

        return () => {
            unsub();
        }

        // eslint-disable-next-line
    }, [])

    

    return (
        <UsersContext.Provider value={users} >
            {children}
        </UsersContext.Provider>
    );

}

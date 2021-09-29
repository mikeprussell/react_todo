
import React, {useContext, useState, useEffect} from 'react'
import firebaseApp, {authResult} from '../base'
import firebase from 'firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    async function authenticate(){
        const authProvider = new firebase.auth.GithubAuthProvider();
        return(
            firebaseApp.auth().signInWithPopup(authProvider).then
            (authHandler)
        )
    }

    async function authHandler(authData){
        setCurrentUser(authData.user);

    }

    async function logout(){
        return firebaseApp.auth().signOut().then(setCurrentUser(null))
    }

    const value = {
        currentUser, authenticate, logout
    }

    useEffect(() => {
        const authChange = authResult.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, []);

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
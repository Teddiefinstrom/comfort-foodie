import { type PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../service/firebase';
import { AuthContext } from './AuthContext';
import {
    type User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    updateEmail, 
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';

const AuthContextProvider: React.FC<PropsWithChildren> = ({children}) => {
const [currentUser, setCurrentUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [userName, setUserName] = useState<string | null>(null);
const [userEmail, setUserEmail] = useState<string | null>(null);


const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
}

const logout = () => {
    return signOut(auth);
}

const forgotPassword = (email: string) => {
    if(!email) {
    throw new Error("Could not find an account with that email")
    }
    return sendPasswordResetEmail(auth, email);
};

const setPassword = (password: string) => {
    if(!currentUser) {
        throw new Error("No user authenticated, cannot change password")
    }
    return updatePassword(currentUser, password);
}

const setEmail = (email: string) => {
    if(!currentUser) {
        throw new Error("No user authenticated, cannot change email")
    }
    return updateEmail(currentUser, email);
}

const setProfileName = (profileName: string) => {
    if (!currentUser) {
        throw new Error("No user authenticated, cannot change Accout Name")
    }
    return updateProfile(currentUser, {displayName: profileName});
}

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);

      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
      } else {
        setUserEmail(null);
        setUserName(null);
      }
    });

    return unsubscribe;
  }, []);
  
    return (
        <AuthContext.Provider
        value={{
            currentUser,
            signup,
            login,
            logout,
            forgotPassword,
            setPassword,
            setEmail,
            setProfileName,
            userEmail,
            userName,
        }}
        >
      {isLoading ? <p> Loading </p> : children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
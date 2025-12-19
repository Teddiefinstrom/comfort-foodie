import { type PropsWithChildren, useEffect, useState } from 'react';
import { auth } from '../service/firebase';
import { AuthContext } from './AuthContext';
import {
    type User,
    type UserCredential,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
} from 'firebase/auth';

const AuthContextProvider: React.FC<PropsWithChildren> = ({children}) => {
const [currentUser, setCurrentUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(true);
//const [userName, setUserName] = useState<string | null>(null);
//const [userEmail, setUserEmail] = useState<string | null>(null);
//const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

const signup = (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
}

const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
}

const logout = (): Promise<void> => {
    return signOut(auth);
}

const forgotPassword = (email: string): Promise<void> => {
    if(!email) {
    throw new Error("Could not find an account with that email")
    }
    return sendPasswordResetEmail(auth, email);
};

{/** 
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

const setProfilePic = (photoURL: string) => {

    if (!currentUser) {
        throw new Error("No user authenticated, cannot change profile picture");
      }
      return updateProfile(currentUser, { photoURL: photoURL });
}

*/}
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);

      {/** 
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName);
        setProfilePhoto(user.photoURL);
      } else {
        setUserEmail(null);
        setUserName(null);
        setProfilePhoto(null);
      }
      */}
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
            // setPassword,
            // setEmail,
            // setProfileName,
            // setProfilePic,
            // profilePhoto,
            // userEmail,
            // userName,
        }}
        >
      {isLoading ? <p> Loading </p> : children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
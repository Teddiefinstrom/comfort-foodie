import { createContext } from 'react';
import type { User, UserCredential } from 'firebase/auth';

interface AuthContextType {

    currentUser: User | null;
    login: (email: string, password: string) => Promise <UserCredential>;
    signup: (email: string, password: string) => Promise <UserCredential>;
    logout: () => Promise <void>;
    forgotPassword: (email: string) => Promise<void>;
    
    // setProfileName: (profileName: string) => Promise <void>;
    // setEmail: (email: string) => Promise <void>;
    // setPassword: (password: string) => Promise <void>;
    // setProfilePic: (photoURL: string) => Promise <void>;
    // profilePhoto: string | null;
    // userEmail: string | null;
    // userName: string | null;
    

}

export const AuthContext = createContext<AuthContextType | null>(null);


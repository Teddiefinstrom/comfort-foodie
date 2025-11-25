import type { User, UserCredential } from 'firebase/auth';
import { createContext } from 'react';

export interface AuthContextType {

    currentUser: User | null;
    login: (email: string, password: string) => Promise <UserCredential>;
    signup: (email: string, password: string) => Promise <UserCredential>;
    logout: () => Promise <void>;
    forgotPassword: (email: string) => Promise<void>;
    setProfileName: (profileName: string) => Promise <void>;
    setEmail: (email: string) => Promise <void>;
    setPassword: (password: string) => Promise <void>;
    //setProfilePhoto: (photoURL: string) => Promise <void>;
    //profilePhotoURL: string | null;
    userEmail: string | null;
    userName: string | null;

};

export const AuthContext = createContext<AuthContextType | null>(null);


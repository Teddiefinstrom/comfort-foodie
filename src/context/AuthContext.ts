import { createContext } from 'react';
import type { User, UserCredential } from 'firebase/auth';

interface AuthContextType {

    currentUser: User | null;
    login: (email: string, password: string) => Promise <UserCredential>;
    signup: (email: string, password: string) => Promise <UserCredential>;
    logout: () => Promise <void>;
    forgotPassword: (email: string) => Promise<void>;

}

export const AuthContext = createContext<AuthContextType | null>(null);


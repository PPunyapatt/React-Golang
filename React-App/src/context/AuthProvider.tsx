import { useContext, createContext, useState, ReactNode } from "react";
import {
    submit
} from "../api/bind_api";

interface AuthContextType {
    username: string;
    id: number;
    loginAction: (data: FormData) => Promise<number>; // Optional function to handle login
}

const initialValue = {
    username: '',
    id: 0,
    loginAction: async () => 0
}

interface AuthProviderProps {
    children: ReactNode; // React elements passed as children
}

interface AuthData {
    username: string;
    id: number;
} 
  

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [values, setValues] = useState({
        username: '',
        id: 0
    });

    const loginAction = async (data: FormData) => {
        let rsp = await submit(String(data.get('username')), String(data.get('password')))
        const res = await rsp.json();
        let user = res.data
        setValues({
            ...values,
            ['username']: user.Username,
            ['id']: user.Id
        });
        const authData: AuthData = {
            username: user.Username,
            id: user.Id
        };
        localStorage.setItem('auth', JSON.stringify(authData));
        return rsp.status
    }

    return (
        <AuthContext.Provider value={{ ...values, loginAction}}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};


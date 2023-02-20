import { useReducer } from 'react';
import { types } from '../types';
import { AuthContext } from './AuthContext';
import { authReducer } from "./AuthReducer";



const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {}, init);

    const login = (user = '', password = '') => {
        
        
        


    }
    const logout = () => {
       
    }
  
    return (
    <AuthContext.Provider value={{
        ...authState,
        login: login,
        logout: logout
    }}>
        {children}
    </AuthContext.Provider>
  )
}

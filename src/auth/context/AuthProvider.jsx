import { useReducer } from 'react';
import { verificarPassword } from '../../helpers/verificarPassword';
import { useAxios } from '../../hooks';
import { types } from '../types';
import { AuthContext } from './AuthContext';
import { authReducer } from "./AuthReducer";
import axios from 'axios';

const env = import.meta.env;
const url = `${env.VITE_REACT_API_ROUTE}api/usuarios`;

//retornos para dar feedback visual en la parte de login
const failLoggedTypes = {
    usuario: '[fail] usuario',
    password: '[fail] password'
}

export const AuthProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {});
    
    //extraer usuarios
    const { data, refreshData } = useAxios(url);
    
    const login = async(nombre = '', password = '') => {
        await refreshData();
        // veridicacion de existencias de usuarios
        const datos = await data;
        const usuario = datos.find(({nombreUsuario}) => nombre === nombreUsuario);
       
        const provUsuario = {
            nombreUsuario: nombre,
            password: password,
        };
        //validar datos de logeo
        if(usuario == null) {
            return failLoggedTypes.usuario
        }

        //verificacion de contrasena
        const verif = await verificarPassword(provUsuario);

        if(verif.estate != 'OK') {
            return failLoggedTypes.password;
        }

        const user = {
            id: usuario.id,
            name: usuario.nombre,
            permiso: usuario.fk_permiso
        }

        const action = {
            type: types.login,
            payload: user
        }
        dispatch(action);
        return 1;
    }

    const logout = () => {
        const action = {
            type: types.logout,
        }  
        dispatch(action);
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

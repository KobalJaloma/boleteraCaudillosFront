import axios from 'axios';
const env = import.meta.env;
const url = `${env.VITE_REACT_API_ROUTE}api/usuarios/validate`;

export const verificarPassword = async(usuario) => {

    const response = await axios.post(url, usuario);

    return response.data;
}
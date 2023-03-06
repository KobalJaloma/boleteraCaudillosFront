import axios from 'axios';
const url = 'http://localhost:8000/api/usuarios/validate';

export const verificarPassword = async(usuario) => {

    const response = await axios.post(url, usuario);

    return response.data;
}
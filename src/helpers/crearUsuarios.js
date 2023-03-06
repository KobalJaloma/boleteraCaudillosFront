import axios from "axios";

export const newUsuario = async(url, payload)=> {
    const response = await axios.post(url, payload);

    return response.data;
}
import axios from "axios";

export const newGet = async(url, payload = {})=> {
    const response = await axios.get(url, payload);
    console.log(payload);
    return response.data;
}
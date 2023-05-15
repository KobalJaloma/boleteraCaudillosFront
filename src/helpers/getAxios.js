import axios from "axios";

export const newGet = async(url)=> {
    const response = await axios.get(url);
    return response.data;
}
import axios from "axios";

export const newPut = async(url, payload) => {
    const response = await axios.put(url, payload);

    return response.data;
}
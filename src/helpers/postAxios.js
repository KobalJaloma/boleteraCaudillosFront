import axios from "axios";

export const newPost = async(url, payload)=> {
    const response = await axios.post(url, payload);

    return response.data;
}
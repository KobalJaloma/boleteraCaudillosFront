import { useEffect, useState } from "react";
import axios from "axios";

export const useAxios = ( url, type = "get") => {
    const [state, setState] = useState({
        data: null, 
        isLoading: null
    });

    const getData = async() => {
        setState({
            ...state,
            isLoading: null
        });

        const respuesta = await axios.get(url);
        const data = await respuesta.data;

        setState({
            data : data,
            isLoading: false
        });
    };

    useEffect(() => {
        getData();
        console.log(url);
    }, [url]);

    return({
        data: state.data,
        isLoading: state.isLoading
    });
}
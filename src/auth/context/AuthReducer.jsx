import { useReducer } from "react";
import { types } from "../types";


const initialState = {
    logged: false,
    user: {}
}

export const authReducer = ( state = initialState, action ) => {
    
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                user: action.payload
            };            
        case types.logout:
            return {
                ...state,
                logged: false,
                user: {}
            };
        default:
            return state;
    }
    
}
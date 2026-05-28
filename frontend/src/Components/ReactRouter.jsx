import React from "react";
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

export const ReactRoute = ({children}) =>{
    const {isAuth} = useAuth();
    if (!isAuth) {
        return <Navigate to="/" replace />; 
    }
    return children;
}
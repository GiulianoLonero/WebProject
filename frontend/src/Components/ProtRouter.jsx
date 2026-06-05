import React from "react";
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

export const ProtRouter = ({children}) =>{
    const {isAuth, user} = useAuth();
    if (!isAuth || user?.role !=="admin") {
        return <Navigate to="/" replace />; 
    }
    return children;
}
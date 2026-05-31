import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = function(){
    const { user, isAuth} = useAuth();
    const navigate = useNavigate();

    return( 
        <div>
            {isAuth ? (
                <div>
                    <h1>Pagina di utente loggato</h1>
                    <p>Sei loggato come: <b>{user?.mail}</b></p>
                </div>
            ):(
                <div>
                    <h1>Home principale</h1>
                </div>
            )}
        </div>
    );
}

export default Home;
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Home = function(){
    const { user, isAuth, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return( 
        <div>
            {isAuth ? (
                <div>
                    <h1>Pagina di utente loggato</h1>
                    <p>Sei loggato come: <b>{user?.mail}</b></p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ):(
                <div>
                    <h1>Home principale</h1>
                    <button onClick={() => navigate('/login')}>
                            Vai alla pagina di Login
                        </button>
                </div>
            )}
        </div>
    );
}

export default Home;
import React from "react";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import { useEvent } from "../../hooks/useEvent";

const Header = function(){
    const {resetEvent} = useEvent();
    const logo = "/Event.png"
    const { isAuth, logout, user } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/")

    }        
    return (
        <div className={styles.Header}>
            <div className={styles.leftSection}></div>
            <div className={styles.centerSection}>
                <img src={logo} alt="Titolo" onClick={() => navigate("/")}/>
            </div>
            
            <div className={styles.rightSection}>
                {!isAuth ? (<button type="button" className={styles.loginButton} onClick={() => navigate("/login")}>
                        Login
                    </button>
                ) : (
                    <>
                        {user?.role === "admin" && (
                            <button 
                                type="button" 
                                className={styles.createEventButton} 
                                onClick={() => {
                                    resetEvent();
                                    navigate("/events/creation-event")
                                }}
                            >
                                Crea Evento
                            </button>
                        )}
                        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                        <button type="button" className={styles.userButton} onClick={() => navigate(`/user-profile/${user._id}`)}>Profilo</button>
                    </>
                )}
            </div>
        </div>
    );
};



export default Header;
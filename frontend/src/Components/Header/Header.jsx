import React from "react";
import { useAuth } from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import logo from  "../Assets/favicon.ico"

const Header = function(){
    const { isAuth, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
    }        
    return(
        <div className={styles.Header}>
           <img src={logo} alt="Icon"></img>
            <h1 className={styles.title}>PoliTicket</h1>
            {!isAuth ?(
                <button type="button" className={styles.loginButton}  onClick={()=> navigate("/login")}>Login</button>
            ):(
                <button type="button" className={styles.logoutButton}  onClick={
                    ()=> {
                        handleLogout();
                        navigate("/");
                    }
                }>Logout</button>
            )}
            
        </div>
    )
}

export default Header
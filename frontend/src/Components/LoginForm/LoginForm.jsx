import React, { useState } from 'react';
import styles from "./LoginForm.module.css";
import axios from "axios";
import {useAuth } from "../../hooks/useAuth"
import { useNavigate } from 'react-router-dom';

// Async function called on submit button
const handleSubmit = async (e, email, password, setErrorMessage, loginGlobal, navigate) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await axios.post("https://e-vent-server.onrender.com/api/v1/auth",
            {
                mail: email,
                password: password
            },
            {
                withCredentials: true
            }
        );

        const {accessToken, userData} = response.data;

        loginGlobal(userData, accessToken)
        navigate('/');

    } catch(error){
        if (error.response){
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage("Server error");
        }
    }
}

// Form
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const {login} = useAuth();
    const navigate = useNavigate();

    return (
        <div className={styles.div}>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e, email, password, setErrorMessage, login, navigate)}>
                <h1> Login </h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <input className = {styles.input} type = "text" placeholder = "Mail" value = {email} onChange={e => setEmail(e.target.value)}/>
                <input className = {styles.input} type = "password" placeholder = "Password" value = {password} onChange={e => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <p className = {styles.paragraph} onClick={()=>navigate("/registration")}>Registrati</p>
            </form>
        </div>
    );
};

export default LoginForm;
import React, { useState } from 'react';
import "./LoginForm.css";
import axios from "axios";
import {useAuth } from "../../hooks/useAuth"
import { useNavigate } from 'react-router-dom';


function InputBox({type, placeholder, value, onChange}) {
    return (
        <div className="input-box">
            <input
                type = {type}
                placeholder = {placeholder}
                value = {value}
                onChange = {onChange}
                required
            />
        </div>
    );  
}

const handleSubmit = async (e, email, password, setErrorMessage, loginGlobal, navigate) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await axios.post("http://localhost:5000/api/auth",
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
const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const {login} = useAuth();
    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <form className="form" onSubmit={(e) => handleSubmit(e, email, password, setErrorMessage, login, navigate)}>
                <h1> Login </h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <InputBox 
                type = "text"
                placeholder = "mail"
                value = {email}
                onChange={e => setEmail(e.target.value)}
                />
                <InputBox 
                type = "password"
                placeholder = "password"
                value = {password}
                onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginForm;
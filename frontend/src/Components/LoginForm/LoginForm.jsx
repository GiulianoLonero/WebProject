import React from "react";
import "./LoginForm.css"

const LoginForm = () =>{
    return (
        <div className="wrapper">
            <form action="">
                <h1> Login </h1>
                <div className="input-box">
                    <input type="text" placeholder="mail" required />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginForm;
import React from "react"
import styles from "./RegisterForm.module.css"
import axios from "axios"
import {useAuth} from "../../hooks/useAuth"
import {useNavigate} from "react-router-dom"
import {useState} from "react"

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        try {
            const response = await axios.post("http://localhost:5000/api/v1/users/register", {
                name: name,
                lastName: lastName,
                mail: mail,
                password: password,
                confirmPassword: confirmPassword
            })
            navigate("/login")
        } catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message);
            } else {
            setErrorMessage("Server error");
            }
        }
    }

    return (
        <div className={styles.div}>
            
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <h1>Register</h1>
                <input type="text" className={styles.name} value = {name} placeholder="Nome..." onChange={(e) => {setName(e.target.value)}}></input>
                <input type="text" className={styles.lastName} value = {lastName} placeholder="Cognome..." onChange={(e) => {setLastName(e.target.value)}}></input>
                <input type="text" className={styles.mail} value = {mail} placeholder="Email..." onChange={(e) => {setMail(e.target.value)}}></input>
                <input type="password" className={styles.password} value = {password} placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}}></input>
                <input type="password" className={styles.confirmPassword} value = {confirmPassword} placeholder="Conferma password..." onChange={(e) => {setConfirmPassword(e.target.value)}}></input>
                <button type="submit" className={styles.button}>Invia</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default RegisterForm
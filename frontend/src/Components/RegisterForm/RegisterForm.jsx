import React, { useEffect } from "react"
import styles from "./RegisterForm.module.css"
import axios from "axios"
import {useAuth} from "../../hooks/useAuth"
import {useNavigate, Navigate, useParams} from "react-router-dom"
import {useState} from "react"

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const {user, token} = useAuth()
    const {id} = useParams();
    const navigate = useNavigate()
    const isSame = user && user?._id === id

    useEffect(()=>{
        if(isSame){
            setName(user?.name)
            setLastName(user?.lastName)
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")
        if(isSame){
            try{
                const response = await axios.put("https://e-vent-server.onrender.com/api/v1/users/edit",{
                    name: name,
                    lastName: lastName,
                    oldPassword: oldPassword,
                    password: password,
                    confirmPassword: confirmPassword
                },
                {
                    withCredentials: true,
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
            }catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message);
            } else {
            setErrorMessage("Server error");
            }
        }
        }else{
            try {
            const response = await axios.post("https://e-vent-server.onrender.com/api/v1/users/register", {
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
    }

    return (
        <div className={styles.div}>
            
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <h1>{!isSame? ("Registrati"):("Modifica profilo")}</h1>
                <input type="text" className={styles.name} value = {name} placeholder="Nome..." onChange={(e) => {setName(e.target.value)}}></input>
                <input type="text" className={styles.lastName} value = {lastName} placeholder="Cognome..." onChange={(e) => {setLastName(e.target.value)}}></input>
                {!isSame? (<input type="text" className={styles.mail} value = {mail} placeholder="Email..." onChange={(e) => {setMail(e.target.value)}}></input>):(<input type="password" className={styles.password} value = {oldPassword} placeholder="Vecchia password..." onChange={(e) => {setOldPassword(e.target.value)}}></input>)}

                <input type="password" className={styles.password} value = {password} placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}}></input>
                <input type="password" className={styles.confirmPassword} value = {confirmPassword} placeholder="Conferma password..." onChange={(e) => {setConfirmPassword(e.target.value)}}></input>
                <button type="submit" className={styles.button}>Invia</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
        </div>
    )
}

export default RegisterForm
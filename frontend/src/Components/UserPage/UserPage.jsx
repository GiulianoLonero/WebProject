import React from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import {useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./UserPage.module.css"

const UserPage = () => {
    const {isAuth, user} = useAuth();
    const {id} = useParams();
    const [searchedUser, setSearchedUser]= useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const isSame = user?._id === id

    useEffect(()=>{
        currentUser(isSame);
    },[id])

    const currentUser = async (isSame)=>{
        if(isSame){
            setSearchedUser(user)
        }else{
            try{
                const response = await axios.get(`http://localhost:5000/api/v1/users/${id}`,{
                    id: id
                })
                setSearchedUser(response.data.user)
            } catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Server error")
            }
        }
        }
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <h2 className={styles.profileTitle}>Pagina utente</h2>
                <p className={styles.paragraph}>Nome: {searchedUser.name} {searchedUser.lastName}</p>
                <p className={styles.paragraph}>Numero di eventi salvati: {searchedUser.savedEvents?.length}</p>
                {isSame && (
                    <>
                <p className={styles.paragraph}>Mail: {searchedUser.mail}</p>
                <button className={styles.button} type="button" onClick={() => navigate("/events/saved-events")}>I tuoi salvati</button>
                <button className={styles.button} type="button" onClick={()=>navigate(`/registration/${user._id}`)}>Modifica profilo</button>
                    </>)
                    }
            </div>
        </div>
    )
}

export default UserPage
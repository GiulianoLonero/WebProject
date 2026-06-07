import React from "react"
import styles from "./Flashcard.module.css"
import {useAuth} from "../../hooks/useAuth";
import axios from "axios"
import {useState} from "react"

const Flashcard = ({event}) =>{
    const {isAuth, token} = useAuth()
    const [errorMessage, setErrorMessage] = useState();
    const imgurl = "/Assets/images/" + event.imgurl + ".jpg"
    const date = new Date(event.date).toLocaleDateString("it-IT")

    const handleSaveEvent = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try{
            const response = await axios.put("http://localhost:5000/api/v1/users", {
                title: event.title
            },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        }catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Server error")
            }
        }
    }

    return(
        <div className={styles.FlashcardContainer}>
            <div className ={styles.FlashcardInner}>
                <div className ={styles.FlashcardFront}>
                    <img src={imgurl} alt="flashcard img" className={styles.imageFront}></img>
                </div>
                <div className={styles.FlashcardBack}>
                    {isAuth && (
                        <button type="button" onClick = {(e) => handleSaveEvent(e)}>Salva evento</button>)
                    }
                    <img src={imgurl} alt="flashcard img" className={styles.imageBack}></img>
                    <div className={styles.overlay}></div>
                    <div className={styles.textContent}>
                        <p className={styles.FlashcardTitle}>{event.title}</p>
                        <p className={styles.FlashcardDesc}>{event.description}</p>
                        <p className={styles.FlashcardDate}>{date}</p>
                        <p className={styles.FlashcardLoc}>{event.position.city}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flashcard;
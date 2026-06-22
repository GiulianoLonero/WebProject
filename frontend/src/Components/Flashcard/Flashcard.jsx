import React from "react"
import styles from "./Flashcard.module.css"
import {useAuth} from "../../hooks/useAuth";
import axios from "axios"
import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useEvent} from "../../hooks/useEvent"

const Flashcard = ({event,savedPage, onOpenChat}) =>{
    const {isAuth, token, user, updateUser} = useAuth()
    const [errorMessage, setErrorMessage] = useState("");
    const imgurl = "/Assets/images/" + event.imgurl + ".jpg"
    const date = new Date(event.date).toLocaleDateString("it-IT")
    const navigate = useNavigate();
    const {currentEvent, passEvent} = useEvent()
    const {savedEvents , changeSavedEvents} = useEvent()

    const handleDeleteEvent = async (e)=>{
        e.preventDefault();
        const userConfirmed = window.confirm(`Sei sicuro di voler eliminare l'evento "${event.title}"? Questa azione è irreversibile.`);
        
        if (!userConfirmed) {
            return; 
        }
        try{
            const response = await axios.delete("http://localhost:5000/api/v1/events/",{
                data:{
                    id: event._id
                },
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })  
        window.location.reload();          
         }catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Server error")
            }
        }
        
    }


    const handleSaveEvent = async (e) => {
        e.preventDefault();
        try{
            console.log("TUTTO L'UTENTE:", user) //da togliere
            const response = await axios.put("http://localhost:5000/api/v1/events/saved-events", {
                eventId: event._id
            },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        updateUser(response.data.savedEvents)


        }catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Server error")
            }
        }
    }

    const handleDeleteSavedEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                "http://localhost:5000/api/v1/events/saved-events",
                {
                    data: { 
                        eventId: event._id 
                    },
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Aggiorna UI con l’elenco aggiornato lato backend (se torna savedEvents)
            if (response?.data?.savedEvents) {
                changeSavedEvents(response.data.savedEvents);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Server error");
            }
        }
    }
    
    const handleEditEvent = (e) => {
        e.preventDefault();
        passEvent(event);
        navigate("/editing-page")
    }

    return(
        <div className={styles.FlashcardContainer}>
            <div className ={styles.FlashcardInner}>
                <div className ={styles.FlashcardFront}>
                    <img src={imgurl} alt="flashcard img" className={styles.imageFront}></img>
                </div>
                <div className={styles.FlashcardBack}>
                    {isAuth && (
                        <>
                        {!savedPage ? (<button className={styles.saveButton} type="button" onClick = {(e) => handleSaveEvent(e)}>Salva evento</button>):
                        (<button className={styles.saveButton} type="button" onClick={(e) => {handleDeleteSavedEvent(e)}}>Elimina salvato</button>)
                    }
                    </>)
                    }
                    {user?.role==="admin" && (
                        <>
                            <button className={styles.delButton} type="button" onClick = {(e) => handleDeleteEvent(e)}>X</button>
                            <button className={styles.modButton} type="button" onClick = {(e) => handleEditEvent(e)}>Modifica</button>
                        </>  
                    )}
                    <img src={imgurl} alt="flashcard img" className={styles.imageBack}></img>
                    <div className={styles.overlay}></div>
                    <div className={styles.textContent}>
                        <p className={styles.FlashcardTitle}>{event.title}</p>
                        <p className={styles.FlashcardDesc}>{event.description}</p>
                        <p className={styles.FlashcardDate}>{date}</p>
                        <p className={styles.FlashcardLoc}>{event.position?.city}</p>
                        <button type="button" onClick={() => onOpenChat(event._id)} className={styles.chatButton}>Commenti</button>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flashcard;
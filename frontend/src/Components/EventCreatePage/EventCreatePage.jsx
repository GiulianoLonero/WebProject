import React, { useState } from "react";
import styles from "./EventCreatePage.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEvent } from "../../hooks/useEvent";
import { useEffect } from "react";


const EventCreatePage = ()=>{
    const {token} = useAuth();
    const {currentEvent, resetEvent} = useEvent();
    const [genre, setGenre] = useState("");
    const [title, setTitle]= useState("");
    const [address, setAddress]= useState("");
    const [city, setCity]= useState("");
    const [name, setName]= useState("");
    const [imgurl, setImgurl]=useState("");
    const [description, setDescription]=useState("");
    const [date, setDate] = useState("");
    const [artists, setArtists] = useState("");
    const [numberOfTickets, setNumberOfTickets] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    let artistsString = "";
    let filteredArtists = [];
    let eventParams = {
                title: title,
                date: date,
                position:{
                    name:name,
                    city: city,
                    address: address
                },
                numberOfTickets: numberOfTickets,
                artists: filteredArtists,
                genre:genre,
                description: description,
                imgurl: imgurl,
            }
    useEffect(() => {
        if (currentEvent){
            setTitle(currentEvent.title)
            setGenre(currentEvent.genre)
            setAddress(currentEvent.address)
            setCity(currentEvent.city)
            setName(currentEvent.name)
            setImgurl(currentEvent.imgurl)
            setDescription(currentEvent.description)
            setDate(currentEvent.date)
            currentEvent.artists.forEach((artist) => {
                artistsString = artist.name + ","
            })
            setArtists(artistsString)
            setNumberOfTickets(currentEvent.numberOfTickets)
        }
    },[])
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrorMessage("")
        const arrayArtists = artists.split(",").map((artist)=>{
            return {name: artist.trim()}
        })
        filteredArtists = arrayArtists.filter(artist=>artist.name!=="");
        try{
            if (!currentEvent){
                const response = await axios.post("http://localhost:5000/api/v1/events/",{eventParams},
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )}
        else {
                const response = await axios.put("http://localhost:5000/api/v1/events/",{eventParams},
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )}

        navigate("/")
            
        }catch(error){
            if(error.response){
                 setErrorMessage(error.response.data.message);
            } else {
            setErrorMessage("Server error");
        }
            
    }

}

    


    return(
        <div className={styles.container}>
            <div className={styles.formDiv}>
                <h1 className={styles.pageTitle}>Crea Evento</h1>
                <form className={styles.form} onSubmit={(e)=>{handleSubmit(e)}}>
                    <input type="text" className={styles.title} value={title} placeholder="Titolo..." onChange={(e)=>{ setTitle(e.target.value)}}></input>
                    <input type="text" className={styles.description} placeholder="Descrizione..." value={description} onChange={(e)=>{setDescription(e.target.value)}}></input>
                    <input type="date" className={styles.date} value={date} onChange={(e)=>{setDate(e.target.value)}}></input>
                    <input type="text" className={styles.city} value={city} placeholder="Città..." onChange={(e)=>setCity(e.target.value)}></input>
                    <input type="text" className={styles.address} value={address} placeholder="Indirizzo..." onChange={(e)=>setAddress(e.target.value)}></input>
                    <input type="text" className={styles.name} value={name} placeholder="Nome locale..." onChange={(e)=>setName(e.target.value)}></input>
                    <input type="text" className={styles.imgurl} value={imgurl} placeholder="Nome file immagine..." onChange={(e)=>setImgurl(e.target.value)}></input>
                    <input type="number" className={styles.numberOfTickets} value={numberOfTickets} placeholder="Numero biglietti..." onChange={(e)=>setNumberOfTickets(e.target.value)}></input>
                    <input type="text" className={styles.artists} value={artists} placeholder="Artisti..." onChange={(e)=>setArtists(e.target.value)}></input>
                    <select name="genre" className={styles.select} value={genre} onChange={(e)=>setGenre(e.target.value)}>
                        <option value="">Genere</option>
                        <option value="music">Concerto</option>
                        <option value="cinema">Cinema</option>
                        <option value="theatre">Teatro</option>
                    </select>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    
                    <button type="submit" className={styles.button}>{currentEvent? "Modifica evento" : "Crea evento"}</button>
                </form>
            </div>
        </div>
    )
}

export default EventCreatePage;
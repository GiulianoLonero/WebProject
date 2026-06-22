import React, { useState, useEffect } from "react";
import styles from "./EventCreatePage.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEvent } from "../../hooks/useEvent";

const EventCreatePage = () => {
    const { token } = useAuth();
    const { currentEvent, resetEvent } = useEvent();
    const [genre, setGenre] = useState("");
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [name, setName] = useState("");
    const [imgurl, setImgurl] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [artists, setArtists] = useState("");
    const [numberOfTickets, setNumberOfTickets] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentEvent) {
            setTitle(currentEvent.title || "");
            setGenre(currentEvent.genre || "");
            setAddress(currentEvent.position?.address);
            setCity(currentEvent.position?.city);
            setName(currentEvent.position?.name);
            setImgurl(currentEvent.imgurl || "");
            setDescription(currentEvent.description || "");
            setDate(currentEvent.date ? currentEvent.date.split("T")[0] : "");

            if (currentEvent.artists) {
                const artistsString = currentEvent.artists.map(artist => artist.name).join(", ");
                setArtists(artistsString);
            }
            
            setNumberOfTickets(currentEvent.numberOfTickets || "");
        }
    }, [currentEvent]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        const arrayArtists = artists.split(",").map((artist) => {
            return { name: artist.trim() }
        });
        const filteredArtists = arrayArtists.filter(artist => artist.name !== "");

        const eventParams = {
            title: title,
            date: date,
            position: {
                name: name,
                city: city,
                address: address
            },
            numberOfTickets: numberOfTickets,
            artists: filteredArtists,
            genre: genre,
            description: description,
            imgurl: imgurl,
        };

        try {
            if (!currentEvent) {
                await axios.post("https://e-vent-server.onrender.com/api/v1/events/", eventParams, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                });

            } else {
                eventParams.id = currentEvent._id
                await axios.put("https://e-vent-server.onrender.com/api/v1/events/", eventParams, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if(resetEvent) resetEvent(); 
            }

            navigate("/");
            
        } catch(error) {
            if (error.response) {
                 setErrorMessage(error.response.data.message);
            } else {
                 setErrorMessage("Server error");
            }
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.formDiv}>
                <h1 className={styles.pageTitle}>{currentEvent ? "Modifica Evento" : "Crea Evento"}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" className={styles.title} value={title} placeholder="Titolo..." onChange={(e)=> setTitle(e.target.value)} />
                    <input type="text" className={styles.description} placeholder="Descrizione..." value={description} onChange={(e)=> setDescription(e.target.value)} />
                    <input type="date" className={styles.date} value={date} onChange={(e)=> setDate(e.target.value)} />
                    <input type="text" className={styles.city} value={city} placeholder="Città..." onChange={(e)=> setCity(e.target.value)} />
                    <input type="text" className={styles.address} value={address} placeholder="Indirizzo..." onChange={(e)=> setAddress(e.target.value)} />
                    <input type="text" className={styles.name} value={name} placeholder="Nome locale..." onChange={(e)=> setName(e.target.value)} />
                    <input type="text" className={styles.imgurl} value={imgurl} placeholder="Nome file immagine..." onChange={(e)=> setImgurl(e.target.value)} />
                    <input type="number" className={styles.numberOfTickets} value={numberOfTickets} placeholder="Numero biglietti..." onChange={(e)=> setNumberOfTickets(e.target.value)} />
                    <input type="text" className={styles.artists} value={artists} placeholder="Artisti separati da virgola..." onChange={(e)=> setArtists(e.target.value)} />
                    
                    <select name="genre" className={styles.select} value={genre} onChange={(e)=> setGenre(e.target.value)}>
                        <option value="">Genere</option>
                        <option value="music">Concerto</option>
                        <option value="cinema">Cinema</option>
                        <option value="theatre">Teatro</option>
                    </select>
                    
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button type="submit" className={styles.button}>{currentEvent ? "Salva Modifiche" : "Crea evento"}</button>
                </form>
            </div>
        </div>
    )
}

export default EventCreatePage;
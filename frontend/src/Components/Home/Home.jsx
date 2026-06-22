import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import { useState } from "react"
import axios from "axios"
import Flashcard from "../Flashcard/Flashcard";
import EventChat from "../EventChat/EventChat";
import styles from "./Home.module.css"


const Home = function(){
    const { user, isAuth} = useAuth();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState([]);
    
    const [activeChatEventId, setActiveChatEventId] = useState(null);

    //per mostrare tutte le flashcard

    useEffect(() => {
        const findEvents = async () => {
            try {
                const genre = searchParams.get("genre")
                const location = searchParams.get("location")
                const search = searchParams.get("search")
                if (genre || location || search){
                const response = await axios.get("http://localhost:5000/api/v1/events", {
                    params: {
                        genre: genre,
                        location: location,
                        search: search
                    }
                });
                setEvents(response.data.events)
            } else {
                const response = await axios.get("http://localhost:5000/api/v1/events/all-events")
                setEvents(response.data.events)
            }
            } catch (error){
                console.error("Error during events research", error.message)
            };
        }
        findEvents();
    }, [searchParams]);

    return( 
        <div className={styles.homeContainer}>
            <Navbar />

            <div className={styles.mainContent}>

                <div className={styles.headerSection}>
                    {isAuth ? (
                        <div>
                            <h1>Benvenuto, {user?.name}</h1>
                            <aside className={styles.aside}>
                                <div className={styles.asideDiv}>
                                    <button type="button" onClick={(e)=>{navigate("/events/saved-events")}}>I tuoi salvati</button>
                                </div>
                            </aside>
                        </div>
                    ):(
                        <div>
                            <h1>Home principale</h1>
                        </div>
                    )}
                </div>
                <div className={styles.eventsGrid}>
                    {events?.length > 0 ? (
                        events.map(event => (
                            <Flashcard 
                                key={event._id}
                                event={event}
                                savedPage={false}
                                onOpenChat={(id) => setActiveChatEventId(id)}
                            />
                        ))
                    ) : (
                        <div className={styles.noEvents}>
                            <p>Nessun evento trovato. Prova a cambiare i filtri!</p>
                        </div>
                    )}
                </div>
            </div>
            {activeChatEventId && (
                <EventChat 
                    eventId={activeChatEventId} 
                    currentUser={user} 
                    onClose={() => setActiveChatEventId(null)} // Chiude azzerando lo stato
                />
            )}
        </div>
    );
}

export default Home;
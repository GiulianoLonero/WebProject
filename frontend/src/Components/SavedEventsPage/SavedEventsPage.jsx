import react from "react";
import styles from "./SavedEventsPage.module.css";
import {useAuth} from "../../hooks/useAuth";
import {Navigate} from "react-router-dom"
import Flashcard from "../Flashcard/Flashcard";
import { useEvent } from "../../hooks/useEvent";

const SavedEventsPage = () => {
    const {user, isAuth} = useAuth();
    const {savedEvents} = useEvent();

    if (!isAuth){
        return <Navigate to = "/registration" replace/>;
    }

    return (
        <div className = {styles.eventsContainer}>
                <div className = {styles.eventsGrid}>
                    {savedEvents.length>0 ?(savedEvents.map(event => (
                        <Flashcard 
                        key = {event._id}
                        event = {event}
                        savedPage={true}
                        />
                    ))
                    ) : (<div className = {styles.noEvents}>
                            <p>Non ci sono eventi salvati</p>
                    </div>)}
                </div>
        </div>
    )
}

export default SavedEventsPage
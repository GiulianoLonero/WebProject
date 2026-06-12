import {createContext, useState, useEffect} from "react";

export const EventContext = createContext()

export function EventProvider({children}){
    const [currentEvent, setCurrentEvent] = useState(null)
    const [savedEvents, setSavedEvents] = useState([])

    function passEvent(currentEvent){
        setCurrentEvent(currentEvent)
    }

    function resetEvent(){
        setCurrentEvent(null)
    }

    function changeSavedEvents(savedEvents){
        setSavedEvents(savedEvents)
    }

    return (
        <EventContext.Provider value={{currentEvent, passEvent, resetEvent,savedEvents,changeSavedEvents}}>
            {children}
        </EventContext.Provider>
    )
}

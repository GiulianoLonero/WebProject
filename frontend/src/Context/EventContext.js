import {createContext, useState, useEffect} from "react";

export const EventContext = createContext()

export function EventProvider({children}){
    const [currentEvent, setCurrentEvent] = useState([])

    function passEvent(currentEvent){
        setCurrentEvent(currentEvent)
    }

    function resetEvent(){
        setCurrentEvent(null)
    }

    return (
        <EventContext.Provider value={{currentEvent, passEvent, resetEvent}}>
            {children}
        </EventContext.Provider>
    )
}

import {useContext} from "react"
import {EventContext} from "../Context/EventContext"

export const useEvent = () => {
    return useContext(EventContext)
}
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
import { useState } from "react"
import axios from "axios"

const Home = function(){
    const { user, isAuth} = useAuth();
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const [events, setEvents] = useState([]) //qui metteremo tutti gli eventi

    useEffect(() => {
        const filteredEvents = async () => {
            try {
                const genre = searchParams.get("genre")
                const location = searchParams.get("location")
                const search = searchParams.get("search")

                const response = await axios.get("http://localhost:5000/api/v1/events", {
                    params: {
                        genre: genre,
                        location: location,
                        search: search
                    }
                });
                setEvents(response.data)
            } catch (error){
                console.error("Error during events research", error.message)
            }
        }
    });

    return( 
        <div>
            <Navbar />
            {isAuth ? (
                <div>
                    <h1>Pagina di utente loggato</h1>
                    <p>Sei loggato come: <b>{user?.mail}</b></p>
                </div>
            ):(
                <div>
                    <h1>Home principale</h1>
                </div>
            )}
        </div>
    );
}

export default Home;
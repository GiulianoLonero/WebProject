import React from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import {useParams} from "react-router-dom";
import { useState } from "react";

const UserPage = () => {
    const {isAuth, user} = useAuth();
    const {id} = useParams();
    const [isSame, setIsSame] = useState();
    const [searchedUser, setSearchedUser]= useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(()=>{
        setIsSame(user?._id === id)
    },[id])

    const currentUser= async (isSame)=>{
        if(isSame){
            setSearchedUser(user)
        }else{
            try{
                const newUser = await axios.get("http://localhost:5000/api/v1/users",{
                    id: id
                })
                setSearchedUser(newUser?.data?.user)
            } catch(error){
            if(error.response){
                setErrorMessage(error.response.data.message)
            } else {
                setErrorMessage("Server error")
            }
        }
        }
    }

    return (
        <div>
            <div>
                Pagina utente
            </div>
        </div>
    )
}
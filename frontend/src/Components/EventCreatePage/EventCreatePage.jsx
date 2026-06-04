import React, { useState } from "react";
import styles from "./EventCreatePage.module.css"

const EventCreatePage = ()=>{
    const [genre, setGenre] = useState();
    const [title, setTitle]= useState();
    const [address, setAddress]= useState();
    const [city, setCity]= useState();
    const [name, setName]= useState();
    


    return(
        <div>
            <h1>Crea Evento</h1>
            <div className={styles.formDiv}>
                <form className={styles.form} onSubmit={()=>{}}>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <input type="text"></input>
                    <select name="genre" className={styles.select} value={genre} onChange={(e)=>setGenre(e.target.value)}>
                        <option value="">Genere</option>
                        <option value="music">Concerto</option>
                        <option value="cinema">Cinema</option>
                        <option value="theatre">Teatro</option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default EventCreatePage;
import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"


const Navbar = function(){
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [genre, setGenre] = useState("Genere")
    const [location, setLocation] = useState("Luogo")
    return(
        <div className={styles.Navbar}>
            <form className={styles.form} onSubmit = {(e) =>
                {e.preventDefault()
                navigate(`/?genre=${genre}&location=${location}&search=${search}`)}}>
                <select name="genre" placeholder="Genere" className={styles.select} value={genre} onChange={(e)=>setGenre(e.target.value)}>
                    <option value="music">Concerto</option>
                    <option value="cinema">Cinema</option>
                    <option value="theatre">Teatro</option>
                </select>
                <select name="location" placeholder="Luogo" className={styles.select} value={location} onChange={(e)=>setLocation(e.target.value)}>
                    <option value="bari">Bari</option>
                    <option value="roma">Roma</option>
                    <option value="taranto">Taranto</option>
                    <option value="torino">Torino</option>
                    <option value="catanzaro">Catanzaro</option>
                </select>
                <input 
                type="text" 
                className={styles.searchBar} 
                placeholder="Ricerca qui..." 
                value={search} 
                onChange = {(e)=>setSearch(e.target.value)} ></input>
                <button type="submit" className={styles.button}>Cerca</button>
            </form>
        </div>
    )
}
export default Navbar;


import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"


const Navbar = function(){
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [genre, setGenre] = useState("")
    const [location, setLocation] = useState("")
    return(
        <div className={styles.Navbar}>
            <form className={styles.form} onSubmit = {(e) =>
                {e.preventDefault()
                navigate(`/?genre=${genre}&location=${location}&search=${search}`)}}>
                <select name="genre" className={styles.select} value={genre} onChange={(e)=>setGenre(e.target.value)}>
                    <option value="">Genere</option>
                    <option value="music">Concerto</option>
                    <option value="cinema">Cinema</option>
                    <option value="theatre">Teatro</option>
                </select>
                <select name="location" className={styles.select} value={location} onChange={(e)=>setLocation(e.target.value)}>
                    <option value="">Luogo</option>
                    <option value="Bari">Bari</option>
                    <option value="Roma">Roma</option>
                    <option value="Taranto">Taranto</option>
                    <option value="Torino">Torino</option>
                    <option value="Catanzaro">Catanzaro</option>
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


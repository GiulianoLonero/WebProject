import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"


const Navbar = function(){
    return(
        <div className={styles.Navbar}>
            <form className={styles.form}>
                <select name="genre" className={styles.select}>
                    <option value="music">Concerto</option>
                    <option value="cinema">Cinema</option>
                    <option value="theatre">Teatro</option>
                </select>
                <select name="location" className={styles.select}>
                    <option value="bari">Bari</option>
                    <option value="roma">Roma</option>
                    <option value="taranto">Taranto</option>
                    <option value="torino">Torino</option>
                    <option value="catanzaro">Catanzaro</option>
                </select>
                <input type="text" className={styles.searchBar} placeholder="Ricerca qui..."></input>
                <button type="submit" className={styles.button}>Cerca</button>
            </form>
        </div>
    )
}


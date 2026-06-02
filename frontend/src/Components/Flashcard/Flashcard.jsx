import styles from "./Flashcard.module.css"

const Flashcard = ({event}) =>{
    const imgurl = "/Assets/" + event.imgurl
    const date = new Date(event.date).toLocaleDateString("it-IT")
    return(
        <div className={styles.FlashcardContainer}>
            <div className ={styles.FlashcardInner}>
                <div className ={styles.FlashcardFront}>
                    <img src={imgurl} alt="flashcard img"></img>
                </div>
                <div className={styles.FlashcardBack}>
                    <p className={styles.FlashcardTitle}>{event.title}</p>
                    <p className={styles.FlashcardDesc}>{event.description}</p>
                    <p className={styles.FlashcardDate}>{date}</p>
                    <p className={styles.FlashcardLoc}>{event.position.city}</p>
                </div>
            </div>
        </div>
    )
}

export default Flashcard;
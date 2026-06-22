import React from "react";
import {useState, useEffect, useRef} from "react";
import styles from "./EventChat.module.css";
import io from "socket.io-client";
import {useAuth} from "../../hooks/useAuth"
import {useNavigate} from "react-router-dom"

const socket = io("https://e-vent-server.onrender.com");

const EventChat = ({eventId, onClose}) => {
    const {user, token, isAuth} = useAuth();
    const [messageText, setMessageText] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const chatEndRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Comunica al backend di entrare nella stanza dell'evento
        socket.emit("join_event_chat", eventId);

        // 2. Ascolta i messaggi in arrivo dagli altri utenti
        socket.on("receive_message", (newMessage) => {
            setMessagesList((prev) => [...prev, newMessage]);
        });

        // Pulizia quando il popup si chiude
        return () => {
            socket.off("receive_message");
        };
    }, [eventId]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messagesList]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        const messageData = {
            eventId: eventId,
            text: messageText,
            senderName: `${user.name} ${user.lastName}`,
            senderId: user?._id
        };

        // Invia il messaggio al server
        socket.emit("send_message", messageData);

        // Aggiunge il messaggio immediatamente alla propria schermata locale
        setMessagesList((prev) => [...prev, { ...messageData, time: "Ora" }]);
        setMessageText("");
    };

    return (
        <div className={styles.chatOverlay}>
            <div className={styles.chatBox}>
                <div className={styles.chatHeader}>
                    <h3>Bacheca Live dell'Evento</h3>
                    <button onClick={() => {console.log("Ho cliccato sulla X di chiusura!"); onClose()}} className={styles.closeBtn}>X</button>
                </div>
                
                <div className={styles.messagesContainer}>
                    {messagesList.map((msg, index) => (
                        <div key={index} className={styles.messageRow}>
                            <span className={styles.sender} onClick = {() => {
                                    navigate(`/user-profile/${msg.senderId}`)
                            }}>{msg.senderName}:</span>
                            <span className={styles.text}>{msg.text}</span>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>
                {isAuth &&(
                <>
                <form onSubmit={handleSendMessage} className={styles.chatForm}>
                    <input 
                        type="text" 
                        value={messageText} 
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Scrivi un messaggio..."
                    />
                    <button type="submit">Invia</button>
                </form>
                </>
                )}
                
            </div>
        </div>
    );
};

export default EventChat;

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors");
const router = require("./router")
const swaggerUi = require("swagger-ui-express");
const swaggerDef = require("./swagger_definition");
require("dotenv").config();


const app = express();

app.use(express.json());
app.use(cors({origin: "https://e-vent-theta.vercel.app", credentials: true})); //origin: porta dove sarà situato il frontend, credentials:true per autorizzare il frontend
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDef));


app.use(router);

const atlasuri = process.env.atlasuri;

mongoose.connect(atlasuri)
    .then(() => console.log("Database connected..."))
    .catch((error) => console.log("Error:", error, "\n"));
    
//server HTTP nativo di Node che avvolge l'app Express
const server = http.createServer(app)

const io = new Server(server, { //inizializzazione di Socket.IO
    cors: {
        origin: "https://e-vent-theta.vercel.app",
        methods: ["GET", "POST"]
    }
});

// 3. Gestione delle connessioni WebSocket
io.on("connection", (socket) => {
    console.log(`Utente connesso alla chat: ${socket.id}`);

    // A. L'utente entra nella stanza specifica dell'evento
    socket.on("join_event_chat", (eventId) => {
        socket.join(eventId);
        console.log(`Utente ${socket.id} entrato nella stanza dell'evento: ${eventId}`);
    });

    // B. Ricezione di un messaggio da un utente e inoltro solo ai membri della stanza
    socket.on("send_message", (data) => {
        socket.to(data.eventId).emit("receive_message", { //broadcast in cui escludo il mittente (altrimenti avrei usato io al posto di socket)
            text: data.text,
            senderName: data.senderName,
            senderId: data.senderId,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });
    socket.on("disconnect", () => {
        console.log(`Utente disconnesso: ${socket.id}`);
    });
});

const PORT = process.env.PORT

server.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
});


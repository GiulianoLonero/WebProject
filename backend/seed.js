const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./models/Event");

const atlasuri = process.env.atlasuri;

async function seed(){
    try{
        await mongoose.connect(atlasuri)
        const events = [
            {
                title: "Nayt - Io Individuo Tour",
                date: new Date("2026-11-09T21:30"),
                position: {
                    name:"Fiera del Levante",
                    city:"Bari",
                    address:"Via Aura 118"
                },
                numberOfTickets: 12,
                artists: [],
                genre:"music",
                description:"Tour dell'ultimo album di Nayt \"Io Individuo\" dopo il suo grande debutto a Sanremo 2026",
                imgurl:"Nayt"
            },
            {
                title: "Festival del Cinema d'Autore",
                date: new Date("2026-12-15T20:00"),
                position: {
                    name: "Cinema Adriano",
                    city: "Roma",
                    address: "Piazza Cavour 22"
                },
                numberOfTickets: 50,
                artists: [], 
                genre: "cinema", 
                description: "Una serata esclusiva dedicata alla proiezione dei migliori cortometraggi indipendenti europei dell'anno.",
                imgurl: "1266358-1nzevu-1980"
            },
            {
                title: "Il Berretto a Sonagli",
                date: new Date("2027-02-10T21:00"),
                position: {
                    name: "Teatro Carignano",
                    city: "Torino",
                    address: "Piazza Carignano 6"
                },
                numberOfTickets: 35,
                artists: [],
                genre: "theatre",
                description: "Il grande classico intramontabile di Luigi Pirandello, portato in scena con una nuova e affascinante regia d'avanguardia.",
                imgurl: "il-berretto-a-sonaglia"
            }
        ]

        const createdEvents = await Event.insertMany(events)
        console.log(`Created ${createdEvents.length} events`)
        await mongoose.connection.close()
        


    }catch(error){
        console.error("Error",error.message)
        process.exit(1)
    }
}
seed()
# Models
User(Name, Last_Name, Password, Mail, Shopping_List, Tickets, IDUser)
Ticket(Price, Status, IDEvent, IDTicket)
Event(Date, Position, N_Tickets, IDEvent, IDArtist)
Artist(IDArtist, Name, Publications)
Order(IDUser, IDOrder, TicketList)

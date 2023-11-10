import { IUser } from "./Interfaces";

export class User implements IUser {

  id: number | null;
  userName: string | null;
  email: string | null;
  password: string | null;
  age: string | null;
  dni: string | null;
  birthDate: Date | null;
  name: string | null;
  lastName: string | null;
  suscription: string | null;

  constructor(user?: any) {
    this.id = user.id != null ? user.id : null;
    this.userName = user.userName != null ? user.userName : null;
    this.email = user.email != null ? user.email : null;
    this.password = user.password != null ? user.password : null;
    this.age = user.age != null ? user.age : null;
    this.dni = user.dni != null ? user.dni : null;
    this.birthDate = user.birthDate != null ? user.birthDate : null;
<<<<<<< Updated upstream
    this.name = user.name != null ? user.name : null;
    this.lastName = user.lastName != null ? user.lastName : null;
    this.suscription = user.suscription != null ? user.suscription : null;
=======
    this.name = user.name != undefined ? user.name : undefined;
    this.lastName = user.lastName != undefined ? user.lastName : undefined;
    this.suscription = user.suscription != undefined ? user.suscription : undefined;
  }
}

export class Event implements IEvent {

  id: number | null = null;
  name: string = '';
  date: Date | null = null;
  hour: Time | null = null;
  place: string = '';
  description: string = '';
  category: string = '';
  image: string = '';
  tickets: number | null = null;

  constructor(event?: any) {
    this.id = event.id != null ? event.id : null;
    this.name = event.name != undefined ? event.name : undefined;
    this.date = event.date != null ? event.date : null;
    this.hour = event.hour != null ? event.hour : null;
    this.place = event.place != undefined ? event.place : undefined;
    this.description = event.description != undefined ? event.description : undefined;
    this.category = event.category != undefined ? event.category : undefined;
    this.image = event.image != undefined ? event.image : undefined;
    this.tickets = event.tickets != null ? event.tickets : null;
  }
}
    
export class Ticket implements ITicket {

  id: number | null = null;
  idUser: number | null = null;
  idEvent: number | null = null;
  ticketQ: number | null = null;
<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes

  constructor(ticket?: any) {
    this.id = ticket.id != null ? ticket.id : null;
    this.idUser = ticket.idUser != null ? ticket.idUser : null;
    this.idEvent = ticket.idEvent != null ? ticket.idEvent : null;
    this.ticketQ = ticket.ticketQ != null ? ticket.ticketQ : null;
>>>>>>> Stashed changes
  }

}
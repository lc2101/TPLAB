import { IEvent, ITicket, IUser } from "./Interfaces";

export class User implements IUser {

  id: number | null = null;
  userName: string = '';
  email: string = '';
  password: string = '';
  age: string = '';
  dni: string = '';
  birthDate: Date | null = null;
  name: string = '';
  lastName: string = '';
  suscription: string = '';

  constructor(user?: any) {
    this.id = user.id != null ? user.id : null;
    this.userName = user.userName != undefined ? user.userName : undefined;
    this.email = user.email != undefined ? user.email : undefined;
    this.password = user.password != undefined ? user.password : undefined;
    this.age = user.age != undefined ? user.age : undefined;
    this.dni = user.dni != undefined ? user.dni : undefined;
    this.birthDate = user.birthDate != null ? user.birthDate : null;
    this.name = user.name != undefined ? user.name : undefined;
    this.lastName = user.lastName != undefined ? user.lastName : undefined;
    this.suscription = user.suscription != undefined ? user.suscription : undefined;
  }
}

export class Event implements IEvent {

  id: number | null = null;
  name: string = '';
  date: Date| null = null;
  description: string = '';
  category: string = '';
  image: string = '';
  tickets: number | null = null;

  constructor(event?: any) {
    this.id = event.id != null ? event.id : null;
    this.date = event.date != null ? event.date : null;
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

  constructor(ticket?: any) {
    this.id = ticket.id != null ? ticket.id : null;
    this.idUser = ticket.idUser != null ? ticket.idUser : null;
    this.idEvent = ticket.idEvent != null ? ticket.idEvent : null;
  }

}
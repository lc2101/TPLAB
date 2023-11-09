export interface IUser {
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
}

<<<<<<< Updated upstream
export interface ITickets {
  id: number | null;
  idUser: number | null;
  idEvent: number | null;
=======
export interface ITicket {
  "id": number | null;
  "idUser": number | null;
  "idEvent": number | null;
  "ticketQ": number | null;
>>>>>>> Stashed changes
}

export interface IEvent {
  id: number | null;
  date: Date | null;
  description: string | null;
  category: string | null;
  image: string | null;
  tickets: number | null;
}
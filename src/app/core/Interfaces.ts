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

export interface ITickets {
  id: number | null;
  idUser: number | null;
  idEvent: number | null;
}

export interface IEvent {
  id: number | null;
  date: Date | null;
  description: string | null;
  category: string | null;
  image: string | null;
}
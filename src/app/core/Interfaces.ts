import { Time } from "@angular/common";

export interface IUser {
  "id": number | null;
  "userName": string;
  "email": string;
  "password": string;
  "age": string;
  "dni": string;
  "birthDate": Date | null;
  "name": string;
  "lastName": string;
  "suscription": string;
}

export interface ITicket {
  "id": number | null;
  "idUser": number | null;
  "idEvent": number | null;
}

export interface IEvent {
  "id": number | null;
  "name": string;
  "date": Date | null;
  "hour": Time | null;
  "place": string;
  "description": string;
  "category": string;
  "image": string;
  "tickets": number | null;
}
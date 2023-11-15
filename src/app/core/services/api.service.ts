import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Event, Ticket } from '../Models';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  //! Users
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users`);
  }

  public updateUser(user: User): Observable<boolean> {
    if (!user.id) throw Error("El id del usuario es requerido");

    return this.http.patch<boolean>(`${this.baseURL}/users/${user.id}`, user);
  }

  public getToAuth(email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}&password=${password}`);
  }

  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/users`, user);
  }
  public checkUserByEmail(email: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseURL}/users?email=${email}`);
  }
  
  public checkUserByDni(dni: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseURL}/users?dni=${dni}`);
  }

  public checkUserByUsername(userName: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseURL}/users?userName=${userName}`);
  }

  //! Events
  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseURL}/events`);
  }

  public getEventByName(name: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.baseURL}/events?name=${name}`);
  }
 

  public addEvent(createEvent: Event): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/events`, createEvent);
  }

  public deleteEvent(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/events/${id}`).
      pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  public editEvent(id: number, updateEvent: Event): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseURL}/events/${id}`, updateEvent);
  }

  public editEventTickets(event: Event, updatedTickets: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.baseURL}/events/${event.id}`, { tickets: updatedTickets });
  }

//! Tickets
  public addTicket(createTicket: Ticket): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/tickets`, createTicket);
  }
  
  public getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseURL}/tickets`);
  }
  
  public getTicketByUserId(id: number): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`${this.baseURL}/tickets?idUser=${id}`);
  }
}

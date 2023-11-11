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
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseURL}/events`);
  }

  getEventByName(name: string): Observable<Event[]>{
    return this.http.get<Event[]>(`${this.baseURL}/events?name=${name}`);
  }

  addEvent(createEvent: Event): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/events`, createEvent);
  }

  deleteEvent(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/events/${id}`).
      pipe(
        map(resp => true),
        catchError(error => of(false))
      );
  }

  editEvent(id: number, updateEvent: Event): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseURL}/events/${id}`, updateEvent);
  }
  addTicket(createTicket: Ticket): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseURL}/tickets`, createTicket);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = "http://localhost:3000"

  constructor(private http: HttpClient) { }

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
}

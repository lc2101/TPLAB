import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';
import { User } from '../Models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null | undefined = null;

  constructor(private apiService: ApiService) { }

  public async checkLogin(email: string, password: string): Promise<boolean> {

    let isLogin = false;

    try {

      let apiResponse = this.apiService.getToAuth(email, password);

      let userResponse = await lastValueFrom(apiResponse);

      this.user = userResponse[0];

      if (this.user) {
        localStorage.setItem('token', this.user.id!.toString());
        isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return isLogin;
  }

  public async checkUserByEmail(email: string): Promise<boolean> {

    let respuesta = false;

    try {

      let user2: User | null | undefined = null;

      let apiResponse = this.apiService.checkUserByEmail(email);

      let userResponse = await lastValueFrom(apiResponse);

      user2 = userResponse[0];

      if (user2) {
        respuesta = true;
      }
    } catch (error) {
      throw error;
    }

    return respuesta;
  }

  public async checkUserByDni(dni: string): Promise<boolean> {

    let respuesta = false;

    try {

      let user2: User | null | undefined = null;

      let apiResponse = this.apiService.checkUserByDni(dni);

      let userResponse = await lastValueFrom(apiResponse);

      user2 = userResponse[0];

      if (user2) {
        respuesta = true;
      }
    } catch (error) {
      throw error;
    }

    return respuesta;
  }

  public async checkUserByUsername(username: string): Promise<boolean> {

    let respuesta = false;

    try {

      let user2: User | null | undefined = null;

      let apiResponse = this.apiService.checkUserByUsername(username);

      let userResponse = await lastValueFrom(apiResponse);

      user2 = userResponse[0];

      if (user2) {
        respuesta = true;
      }
    } catch (error) {
      throw error;
    }

    return respuesta;
  }
  
  public createUser(user: User): Promise<User> {
    
    return new Promise<User>((resolve, reject) => {
      this.apiService.createUser(user).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }

  public checkAuthentication(): string{
    return localStorage.getItem('token')!;
  }
}

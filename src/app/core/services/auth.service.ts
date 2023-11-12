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
        localStorage.setItem('user', JSON.stringify(this.user));
        isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return isLogin;
  }

  public async checkUserByEmail(email: string): Promise<User> {

    let user2: User | null = null;

    try {

      let apiResponse = this.apiService.checkUserByEmail(email);

      let userResponse = await lastValueFrom(apiResponse);

      user2 = userResponse[0];

    } catch (error) {
      throw error;
    }

    return user2;
  }

  public async checkUserByDni(dni: string): Promise<User> {

    let user2: User | null = null;

    try {

      let apiResponse = this.apiService.checkUserByDni(dni);

      let userResponse = await lastValueFrom(apiResponse);

      user2 = userResponse[0];

    } catch (error) {
      throw error;
    }

    return user2;
  }

  public async checkUserByUsername(username: string): Promise<User> {

    let user2: User | null = null;

    try {

      let apiResponse = this.apiService.checkUserByUsername(username);

      let userResponse = await lastValueFrom(apiResponse);

      user2 = userResponse[0];

    } catch (error) {
      throw error;
    }

    return user2;
  }

  public logout() {
    this.user = undefined;
    localStorage.clear();
  }
  
  public createUser(user: User): Promise<User> {
    
    return new Promise<User>((resolve, reject) => {
      this.apiService.createUser(user).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }

  public async updateUser(user: User): Promise<boolean> {

    let resp = false;

    try {
      const apiResp = this.apiService.updateUser(user);
      resp = await lastValueFrom(apiResp);
    } catch (error) {
      throw error;
    }

    return resp;
    
  }

  public checkAuthentication(): string{
    return localStorage.getItem('token')!;
  }

  public checkSession(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

  public getUserData(): User {
    const userString = localStorage.getItem(('user'));
    this.user = userString ? JSON.parse(userString) : null;
    return this.user!;
  }
}

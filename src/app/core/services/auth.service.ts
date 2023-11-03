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

      let userRespone = await lastValueFrom(apiResponse);

      this.user = userRespone[0];

      if (this.user) {
        //localStorage.setItem('token', this.user.id!.toString());
        isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return isLogin;
  }

  public checkUserByEmail(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.apiService.checkUserByUsername(email).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }
  
  public checkUserByDni(dni: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.apiService.checkUserByUsername(dni).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }
  
  public checkUserByUsername(userName: string): Promise<boolean> {
    
    return new Promise<boolean>((resolve, reject) => {
      this.apiService.checkUserByUsername(userName).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    }); 
   }
  
  public createUser(user: User): Promise<User> {
    
    return new Promise<User>((resolve, reject) => {
      this.apiService.createUser(user).subscribe({
        next: data => resolve(data),
        error: error => reject(error)
      })
    });
  }
}

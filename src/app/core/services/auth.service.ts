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

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public async login(email: string, password: string): Promise<boolean> {

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
}

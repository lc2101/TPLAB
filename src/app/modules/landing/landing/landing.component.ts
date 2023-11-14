import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  constructor(private router: Router, private authService: AuthService){}

  public goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  public goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  public goToHome() {
    this.router.navigate(['/home']);
    alert("Ya estas en una sesion!");
  }

  public checkUser() {
    return this.authService.checkAuthentication() ? true : false;
  }
  
}

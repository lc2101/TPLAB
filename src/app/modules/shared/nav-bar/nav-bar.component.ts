import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  @Input() isUser: boolean = false;


    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
    }

    public goToLogin() {
      this.router.navigate(["/auth/login"]);
  }
  
  public goToProfile() {
    this.router.navigate(["/profile"]);
  }

  public goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  public logOut() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public goToHome() {
    this.router.navigate(['/home']);
  }

  public goToLanding() {
    this.router.navigate(['/landing']);
  }

  public goToMyEvents() {
    this.router.navigate(['/my-events']);
  }

  public checkUser() {
    return this.authService.checkAuthentication()? true : false;
  }
}

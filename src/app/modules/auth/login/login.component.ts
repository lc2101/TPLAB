import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public user: User | null = null;

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    
  }

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required]),
  
  })

  public async checkAuth() {

    try {
      let isLogin: boolean = await this.authService.checkLogin(this.loginForm.value.email, this.loginForm.value.password);

      if (isLogin) {
        this.router.navigate(['/home']);
      } else {
        alert("Usuario o contraseña incorrectos");

        this.loginForm.reset({ email: this.loginForm.value.email });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }

  isValidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  getFieldError(field: string, fieldType: string): string {

    const errors = this.loginForm.get(field)!.errors || {};

    switch (fieldType) {
      case 'email':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `El ${fieldType} es requerido.`;
          case 'pattern':
            return `El ${fieldType} es inválido.`;
        }
        break;
      case 'contraseña':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `La ${fieldType} es requerida.`;
        }
        break;
    }

    return '';
  }

}
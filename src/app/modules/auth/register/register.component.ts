import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get name() {
    return this.registerForm.get('name') as FormControl;
  }

  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }

  get birthDate() {
    return this.registerForm.get('birthDate') as FormControl;
  }

  get userName() {
    return this.registerForm.get('userName') as FormControl;
  }

  get dni() {
    return this.registerForm.get('dni') as FormControl;
  }

  public user: User | null = null;

  private dniPattern: RegExp = /^\d+$/; // solo permite numeros

  private namePattern: RegExp = /^[A-Z][a-z]*$/; // solo letras

  private passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/; //al menos una letra minuscula, una mayuscula y un numero. Permite caracteres especiales (opcional)

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    birthDate: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    dni: new FormControl('',[Validators.required, Validators.pattern(this.dniPattern)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {


  }

  
  isValidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  
  getFieldError(field: string): string | null {

    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field] || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido.";
        case 'pattern':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        
      }
    }

    return null;
  }

  /*

  async onSubmit() {

    if (this.loginForm.valid) {
      // lógica para verificar las credenciales de inicio de sesión
      console.log('Formulario válido. Usuario: ', this.loginForm.value.email);
    } else {
      // El formulario no es válido, muestra un mensaje de error si es necesario.
      console.log('Formulario no válido');
    }

    try {

      let isLogin: boolean = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);

      if (isLogin) {
        this.router.navigate(["/main"]);
      }
      else {

        this.email = this.loginForm.value.email;

        this.loginForm.reset({ email: this.email });
      }

    } catch (error) {
      console.log(error);
    }

  }*/
}
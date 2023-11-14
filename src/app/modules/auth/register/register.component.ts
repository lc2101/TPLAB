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

  public user: User = new User({ id : null, birthDate: null});

  private dniPattern: RegExp = /^\d+$/; // solo permite numeros

  private namePattern: RegExp = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/; // solo letras

  private passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/; //al menos una letra minuscula, una mayuscula y un numero. Permite caracteres especiales (opcional)

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  registerForm: FormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern(this.namePattern)]),
    birthDate: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required, Validators.minLength(6)]),
    dni: new FormControl('',[Validators.required, Validators.pattern(this.dniPattern), Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]),
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.calcularFechaHace18Anios();

  }

  public async userRegister() {
    this.user!.name = this.registerForm.value.name;
    this.user!.lastName = this.registerForm.value.lastName;
    this.user!.birthDate = this.registerForm.value.birthDate;
    this.user!.dni = this.registerForm.value.dni;
    this.user!.userName = this.registerForm.value.userName;
    this.user!.email = this.registerForm.value.email;
    this.user!.password = this.registerForm.value.password;

    let checkDNI = await this.authService.checkUserByDni(this.user.dni!);
    let checkEmail = await this.authService.checkUserByEmail(this.user.email!);
    let checkUsername = await this.authService.checkUserByUsername(this.user.userName!);
    
    if (checkDNI == null) {
      if (checkEmail == null) {
        if (checkUsername == null) {
          this.authService.createUser(this.user!)
            .then(() => {
              alert("Usuario registrado exitosamente");
              this.router.navigate(['/auth/login']);
            })
          .catch(() => alert("No se pudo registrar el usuario"));
        } else {
          alert("Nombre de usuario no disponible")
        }
      } else {
        alert("Email ya registrado")
      }
    } else {
      alert("DNI ya registrado")
    }
    
  }
  
  isValidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors && this.registerForm.controls[field].touched;
  }

  getFieldError(field: string, fieldType: string): string {

    const errors = this.registerForm.get(field)!.errors || {};

    switch (fieldType) {
      case 'email':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerido.`;
          case 'pattern':
            return `${fieldType} inválido.`;
        }
        break;
      case 'contraseña':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerida.`;
          case 'pattern':
            return `${fieldType} inválida. Debe contener al menos 6 caracteres, incluyendo una letra minuscula, una mayuscula y un numero.`;
          case 'minlength':
            return `${fieldType} inválida. Debe contener al menos 6 caracteres, incluyendo una letra minuscula, una mayuscula y un numero.`;
        }
        break;
      case 'nombre':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerido.`;
          case 'pattern':
            return `${fieldType} inválido.`;
        }
        break;
      case 'apellido':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerido.`;
          case 'pattern':
            return `${fieldType} inválido.`;
        }
        break;
      case 'nombre de usuario':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerido.`;
          case 'minlength':
            return `${fieldType} inválido. Debe contener al menos 6 caracteres`;
        }
        break;
      case 'documento':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerido.`;
          case 'pattern':
            return `${fieldType} inválido.`;
          case 'minlength':
            return `${fieldType} inválido.`;
        }
        break;
      case 'Fecha de nacimiento':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerida.`;
        }
        break;
    }

    return '';
  }

  public calcularFechaHace18Anios(): string {
    let fechaActual = new Date();
    let anioActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth();
    let diaActual = fechaActual.getDate();

    let anioHace18 = anioActual - 18;
    

    const fechaHace18Anios = new Date(anioHace18, mesActual, diaActual);

    return fechaHace18Anios.toISOString().split('T')[0];
  }

  
}
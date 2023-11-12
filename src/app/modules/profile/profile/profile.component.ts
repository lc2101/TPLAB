import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  public user: User = new User({ id : null, birthDate: null});

  private dniPattern: RegExp = /^\d+$/; // solo permite numeros

  private namePattern: RegExp = /^[A-Z][a-z]*$/; // solo letras

  private passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{6,}$/; //al menos una letra minuscula, una mayuscula y un numero. Permite caracteres especiales (opcional)

  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  updateForm: FormGroup = this.fb.group({
    name: new FormControl(`${this.getUserData().name}`, [Validators.required, Validators.pattern(this.namePattern)]),
    lastName: new FormControl(`${this.getUserData().lastName}`, [Validators.required, Validators.pattern(this.namePattern)]),
    birthDate: new FormControl(`${this.getUserData().birthDate}`, [Validators.required]),
    userName: new FormControl(`${this.getUserData().userName}`, [Validators.required, Validators.minLength(6)]),
    dni: new FormControl(`${this.getUserData().dni}`, [Validators.required, Validators.pattern(this.dniPattern)]),
    email: new FormControl(`${this.getUserData().email}`, [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl(`${this.getUserData().password}`, [Validators.required, Validators.minLength(6), Validators.pattern(this.passwordPattern)]),
  })

  constructor(private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  
  public getUserData(): User {
    return structuredClone(this.authService.getUserData());
  }

  public async updateUser() {
    this.user!.id = this.authService.getUserData().id;
    this.user!.name = this.updateForm.value.name;
    this.user!.lastName = this.updateForm.value.lastName;
    this.user!.birthDate = this.updateForm.value.birthDate;
    this.user!.userName = this.updateForm.value.userName;
    this.user!.dni = this.updateForm.value.dni;
    this.user!.email = this.updateForm.value.email;
    this.user!.password = this.updateForm.value.password;

    let checkDNI = await this.authService.checkUserByDni(this.user.dni!);
    let checkEmail = await this.authService.checkUserByEmail(this.user.email!);
    
    if (checkDNI == null || checkDNI.id == this.user!.id ) {
      if (checkEmail == null || checkEmail.id == this.user!.id) {
        if (confirm("Esta seguro que desea guardar los cambios realizados?")) {
            this.authService.updateUser(this.user!)
              .then(() => alert("Usuario actualizado!"))
              .catch(() => alert("No se pudo actualizar el usuario"));
          }
        } else {
        alert("Email ya registrado")
        }
      } else {
        alert("DNI ya registrado")
      }
    
  }
  
  isValidField(field: string): boolean | null {
    return this.updateForm.controls[field].errors && this.updateForm.controls[field].touched;
  }

  getFieldError(field: string, fieldType: string): string {

    const errors = this.updateForm.get(field)!.errors || {};

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
      case 'documento':
        switch (Object.keys(errors)[0]) {
          case 'required':
            return `${fieldType} requerido.`;
          case 'pattern':
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

}
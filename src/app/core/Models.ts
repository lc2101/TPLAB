import { IUser } from "./Interfaces";

export class User implements IUser {

  id: number | null;
  userName: string | null;
  email: string | null;
  password: string | null;
  age: string | null;
  dni: string | null;
  birthDate: Date | null;
  name: string | null;
  lastName: string | null;
  suscription: string | null;

  constructor(user?: any) {
    this.id = user.id != null ? user.id : null;
    this.userName = user.userName != null ? user.userName : null;
    this.email = user.email != null ? user.email : null;
    this.password = user.password != null ? user.password : null;
    this.age = user.age != null ? user.age : null;
    this.dni = user.dni != null ? user.dni : null;
    this.birthDate = user.birthDate != null ? user.birthDate : null;
    this.name = user.name != null ? user.name : null;
    this.lastName = user.lastName != null ? user.lastName : null;
    this.suscription = user.suscription != null ? user.suscription : null;
  }

}
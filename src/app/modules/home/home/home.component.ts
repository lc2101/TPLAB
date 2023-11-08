import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Event } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public events: Array<Event> = [];

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.getEvents();
  }

  public async getEvents() {
    try {

      let respApi = this.apiService.getEvents();

      const data = await lastValueFrom(respApi);

      this.events = data.map((event: any) => new Event(event)); 
      
    } catch (error) {
      console.error(error);
    }
  }

  public createEvent(event: Event) {
    this.apiService.addEvent(event).subscribe({
      next: () => {
        this.getEvents();
        alert("Evento creado con exito");
      },
      error: () => {
        alert("No se ha podido crear el evento");
      }
    })
  }

  public deleteEvent(id: number) {
    this.apiService.deleteEvent(id).subscribe({
      next: () => {
        this.getEvents();
        alert("Persona eliminada con exito");
      },
      error: () => {
        alert("No se ha podido eliminar a la persona");
      }
    })
   }
  
  /*public editEvent(updateEvent: Event) {
    const dialogRef = this.dialog.open(EditEventComponent, { data: updateEvent, height: '500px', width: '500px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }*/
}

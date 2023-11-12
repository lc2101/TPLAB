import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Event, Ticket } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BuyEventComponent } from '../../events/buy-event/buy-event.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('editEventDialog', { static: false }) editEventDialog!: TemplateRef<any>;
  @ViewChild('buyEventDialog', { static: false }) buyEventDialog!: TemplateRef<any>;
  public events: Array<Event> = [];
  public myEvents: Array<Ticket>=[];
  
  public editEvent: Event = { id: 0, name: '', date: null, hour: null, place: '', description: '', category: '', image: '', tickets: 0};
  public isPopupVisible = false;

  constructor(private apiService: ApiService, private authService: AuthService,
     private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.getEvents();
    this.getMyEvents();
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
  
  public async getMyEvents() {
    try {
      let respApi = this.apiService.getTicketByUserId(Number(this.checkUser()));

      const data = await lastValueFrom(respApi);

      this.myEvents = data.map((ticket: any) => new Ticket(ticket)); 

      
      
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
        alert("Evento eliminado con exito");
      },
      error: () => {
        alert("No se ha podido eliminar el evento");
      }
    })
   }
  
  public updateEvent() {
    console.log(this.editEvent);
    this.apiService.editEvent(this.editEvent.id!, this.editEvent).subscribe({
      next: () => {
        this.closeDialog();
        this.getEvents()
      },
      error: (error) => alert(error)
    })
  }

  public openEditEventDialog(event: Event): void {
    this.editEvent = structuredClone(event);

    const dialogRef = this.dialog.open(this.editEventDialog, {
      height: '500px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result: Event | undefined) => {
      if (result) {
        console.log(result);
      }
    });

  }
  public openBuyTicketDialog(event: Event): void {
    this.editEvent = structuredClone(event);

    const dialogRef = this.dialog.open(BuyEventComponent, {
      data:event,
      height: '500px',
      width: '500px',
    });

  }

  public closeDialog(): void {
    this.dialog.closeAll(); // Cierra todos los diálogos abiertos
  }

  public checkUser() {
    return this.authService.checkAuthentication();
  }
}

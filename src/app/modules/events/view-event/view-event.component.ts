import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event, Ticket } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit{

  @Input() public events: Array<Event> = [];
  public MyTickets: Array<Ticket> = [];
  @Output() public eventToDelete: EventEmitter<number> = new EventEmitter();
  @Output() public eventToEdit: EventEmitter<Event> = new EventEmitter();
  @Output() public ticketToBuy: EventEmitter<Event> = new EventEmitter();

  filterPost = '';
  
  constructor(private authService: AuthService, private apiService: ApiService){}

  ngOnInit(): void {
    this.getMyEvents();
  }

  public deleteEvent(id: number) {
    if(confirm('Esta seguro que desea eliminar el evento?'))
      this.eventToDelete.emit(id);
  }

  public editEvent(updateEvent: Event) {
    this.eventToEdit.emit(updateEvent);
  }

  public checkUser() {
    return this.authService.checkAuthentication();
  }

  public buyTicket(theEvent: Event)
  {
    this.ticketToBuy.emit(theEvent);
  }

  public fechaActual(): string {
    let fechaActual = new Date();
    return fechaActual.toISOString().split('T')[0];
  }

  public async getMyEvents() {
    try {
      let respApi = this.apiService.getTicketByUserId(Number(this.checkUser()));

      const data = await lastValueFrom(respApi);

      this.MyTickets = data.map((ticket: any) => new Ticket(ticket));
      
    } catch (error) {
      console.error(error);
    }
  }

  public getEventsWithTickets(idEvent: number): number {
    const hayTicket = this.MyTickets.filter(MyTicket => MyTicket.idEvent === idEvent);
    let disponibleTickets = 4;
    let purchasedTickets = 0;
    
    if (hayTicket.length > 0) {
      const arregloTicketQ = hayTicket.map(ticket => ticket.ticketQ!);
      for (const ticketQ of arregloTicketQ) {
        purchasedTickets += ticketQ;
      }
    }

    disponibleTickets -= purchasedTickets;

    return disponibleTickets;
  }

}

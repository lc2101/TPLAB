import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { Ticket, Event } from 'src/app/core/Models';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-buy-event',
  templateUrl: './buy-event.component.html',
  styleUrls: ['./buy-event.component.css']
})
export class BuyEventComponent implements OnInit {

  public newTicket: Ticket = new Ticket({id:0});
  public theEvent: Event= new Event({id:0});
  public ticketQ: number = 0;
  public myTickets: Array<Ticket> = [];

constructor(@Inject(MAT_DIALOG_DATA) public data:any, private apiService : ApiService, private dialogRef: MatDialogRef<BuyEventComponent>, private authService:AuthService)
{}


  
  ngOnInit(): void {
    this.theEvent = this.data
    this.getMyTickets();
  }

  public buy() {
    
    if ((this.theEvent.tickets! - Number(this.ticketQ)) >= 0) {
      if (confirm(`Esta seguro que desea comprar ${this.ticketQ} entradas?`)) {
      
        this.newTicket.idUser = parseInt(this.checkUser());
        this.newTicket.idEvent = this.theEvent.id;
        this.newTicket.ticketQ = Number(this.ticketQ);

        this.createTicket();
      }
    } else {
      alert(`Quedan ${this.theEvent.tickets} entradas disponibles` );
    }
  }

  public createTicket() {
    this.apiService.addTicket(this.newTicket).subscribe({
      
      next: () => {
        alert("Operacion realizada");
        this.dialogRef.close(true);
      },
      error: () => {
        alert("No se ha podido realizar la operacion");
      }
    });
  }

  
  public checkUser() {
    return this.authService.checkAuthentication();
  }
  public closeDialog(): void {
    this.dialogRef.close(false);

  }

  public async getMyTickets() {
    try {
      let respApi = this.apiService.getTicketByUserId(Number(this.checkUser()));

      const data = await lastValueFrom(respApi);

      this.myTickets = data.map((ticket: any) => new Ticket(ticket));
      
    } catch (error) {
      console.error(error);
    }
  }

  public getEventsWithTickets(idEvent: number) {
    let tickets = 0;
    const hayTicket = this.myTickets.filter(myTicket => myTicket.idEvent === idEvent);
    
    if (hayTicket.length > 0) {
      hayTicket.forEach(ticket => {
        tickets += ticket.ticketQ!;
      });
    }

    return tickets;
  }

  public getDisponibleTickets(idEvent: number): Array<number> {

    let disponibleTickets: Array<number> = [0, 1, 2, 3, 4];

    const purchasedTickets = this.getEventsWithTickets(idEvent);

    switch (purchasedTickets) {
      case 1:
        disponibleTickets = [0, 1, 2, 3];
        return disponibleTickets;
        break;
      case 2:
        disponibleTickets = [0, 1, 2];
        return disponibleTickets;
        break;
      case 3:
        disponibleTickets = [0, 1];
        return disponibleTickets;
        break;
    }

    return disponibleTickets;
  }
}

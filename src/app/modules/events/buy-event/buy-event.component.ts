import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  public ticketQ: number= 0;
  public ticketOptions: Array<number> = [1, 2, 3, 4];

constructor(@Inject(MAT_DIALOG_DATA) public data:any, private apiService : ApiService,
private dialogRef: MatDialogRef<BuyEventComponent>, private authService:AuthService)
{}


  
  ngOnInit(): void {
    this.theEvent=this.data
  }

  public buy() {
    
    
    
    
    if ((this.theEvent.tickets! - Number(this.ticketQ)) >= 0) {
      
      
      this.newTicket.idUser =  parseInt(this.checkUser());
      this.newTicket.idEvent= this.theEvent.id;
      this.newTicket.ticketQ = Number(this.ticketQ);

      this.createTicket();
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

  
}

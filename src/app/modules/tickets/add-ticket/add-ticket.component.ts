import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Ticket } from 'src/app/core/Models';
import { HomeComponent } from '../../home/home/home.component';

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent {
  public newTicket: Ticket = new Ticket({id: null});
 

  @Output() public ticketToCreate: EventEmitter<Ticket> = new EventEmitter();

  addTicketForm: FormGroup = this.fb.group({
    idUser: new FormControl(null, [Validators.required]),
    idEvent: new FormControl(null, [Validators.required]),
    ticketQ: new FormControl(null, [Validators.required]),
   
  })

  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
  }

  public onSubmit() {
    this.newTicket.idUser = 0;
    this.newTicket.idEvent = 0;
    this.newTicket.ticketQ = 0;
    
    this.createTicket();
  }

  public createTicket() {
    this.ticketToCreate.emit(this.newTicket);
  }

  isValidField(field: string): boolean | null {
    return this.addTicketForm.controls[field].errors && this.addTicketForm.controls[field].touched;
  }
 
}

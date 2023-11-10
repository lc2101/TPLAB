import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'src/app/core/Models';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent {
  public newTicket: Ticket = new Ticket({id: null});

  @Output() public ticketToCreate: EventEmitter<Ticket> = new EventEmitter();

  addTicketForm: FormGroup = this.fb.group({
    userId: new FormControl('', [Validators.required]),
    eventID: new FormControl('', [Validators.required]),
    tickets: new FormControl(0, [Validators.required])
  })

  constructor(private fb: FormBuilder, private authService: AuthService){}
  
  ngOnInit(): void {
  }

  public onSubmit() {
    this.newTicket.idUser = Number(this.authService.checkAuthentication());
    this.newTicket.idEvent = this.addTicketForm.value.date;
    this.newTicket.ticketQ = this.addTicketForm.value.ticketQ;

    this.createTicket();
  }

  public createTicket() {
    this.ticketToCreate.emit(this.newTicket);
  }

  isValidField(field: string): boolean | null {
    return this.addTicketForm.controls[field].errors && this.addTicketForm.controls[field].touched;
  }

}

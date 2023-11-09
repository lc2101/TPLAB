<<<<<<< Updated upstream
import { Component } from '@angular/core';
=======
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event, Ticket } from 'src/app/core/Models';
>>>>>>> Stashed changes

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {

<<<<<<< Updated upstream
=======
  @Input() public events: Array<Event> = [];
  @Output() public eventToDelete: EventEmitter<number> = new EventEmitter();
  @Output() public eventToEdit: EventEmitter<Event> = new EventEmitter();
  
  
  constructor(private authService: AuthService){}

  ngOnInit(): void {
  }

  public deleteEvent(id: number) {
    this.eventToDelete.emit(id);
  }

  public editEvent(updateEvent: Event) {
    this.eventToEdit.emit(updateEvent);
  }
  
  public checkUser() {
    return this.authService.checkAuthentication();
  }
  

>>>>>>> Stashed changes
}

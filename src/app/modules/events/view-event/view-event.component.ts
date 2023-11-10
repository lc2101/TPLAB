import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Event } from 'src/app/core/Models';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent {

  @Input() public events: Array<Event> = [];
  @Output() public eventToDelete: EventEmitter<number> = new EventEmitter();
  @Output() public eventToEdit: EventEmitter<Event> = new EventEmitter();
  
  constructor(private authService: AuthService){}

  ngOnInit(): void {
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

}

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
  
  ngOnInit(): void {
  }

  public deleteEvent(id: number) {
    this.eventToDelete.emit(id);
  }

  public editEvent(updateEvent: Event) {
    this.eventToEdit.emit(updateEvent);
  }

}

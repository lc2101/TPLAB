import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Event, Ticket } from 'src/app/core/Models';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent {
  @Input() public myEvents: Array<Ticket> = [];
  @Input() public events: Array<Event> = [];

  constructor(private authService: AuthService){}

  ngOnInit(): void {
  }
  public checkUser() {
    return this.authService.checkAuthentication();
  }
  
}

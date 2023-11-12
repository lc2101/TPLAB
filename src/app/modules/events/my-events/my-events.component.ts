import { ApiService } from 'src/app/core/services/api.service';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Event, Ticket } from 'src/app/core/Models';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit{
  
  public myEvents: Array<Ticket> = [];
  public events: Array<Event> = [];
  filterPost = '';

  constructor(private authService: AuthService, private apiService: ApiService){}

  ngOnInit(): void {
    this.getMyEvents();
    this.getEvents();
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

  public async getEvents() {
    try {

      let respApi = this.apiService.getEvents();

      const data = await lastValueFrom(respApi);

      this.events = data.map((event: any) => new Event(event));
      
    } catch (error) {
      console.error(error);
    }
  }

  public checkUser() {
    return this.authService.checkAuthentication();
  }
  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
<<<<<<< Updated upstream
=======
import { ReactiveFormsModule } from '@angular/forms';
import { TicketsComponent } from './tickets/tickets.component';
>>>>>>> Stashed changes



@NgModule({
  declarations: [
    AddEventComponent,
    ViewEventComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }

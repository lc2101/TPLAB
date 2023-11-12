import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BuyEventComponent } from './buy-event/buy-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AddEventComponent,
    ViewEventComponent,
    BuyEventComponent,
    MyEventsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    AddEventComponent,
    ViewEventComponent,
    MyEventsComponent
  ]
})
export class EventsModule { }

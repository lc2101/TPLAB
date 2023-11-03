import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';



@NgModule({
  declarations: [
    AddEventComponent,
    ViewEventComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventsModule { }

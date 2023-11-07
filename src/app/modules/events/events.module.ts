import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddEventComponent,
    ViewEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AddEventComponent,
    ViewEventComponent
  ]
})
export class EventsModule { }

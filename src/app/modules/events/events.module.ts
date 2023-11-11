import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BuyEventComponent } from './buy-event/buy-event.component';



@NgModule({
  declarations: [
    AddEventComponent,
    ViewEventComponent,
    BuyEventComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [
    AddEventComponent,
    ViewEventComponent
  ]
})
export class EventsModule { }

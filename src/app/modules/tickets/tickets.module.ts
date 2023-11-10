import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';



@NgModule({
  declarations: [
    AddTicketComponent,
    ViewTicketComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TicketsModule { }

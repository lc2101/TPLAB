import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing/landing.component';
import { NosotrosComponent } from './nosotros/nosotros.component';


@NgModule({
  declarations: [
    LandingComponent,
    NosotrosComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { Error404Component } from './standalones/error404/error404.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyProfileComponent } from './standalones/my-profile/my-profile.component';


@NgModule({
  declarations: [
    Error404Component,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    ReactiveFormsModule
  ]
})
export class ModulesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FilterPipe } from './pipes/filter.pipe';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    FilterPipe
  ]
})
export class SharedModule { }

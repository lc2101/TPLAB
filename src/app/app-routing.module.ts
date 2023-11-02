import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing/landing.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:'',
    component:LandingComponent,
    loadChildren: () => import("./modules/landing/landing.module").then(n=>n.LandingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

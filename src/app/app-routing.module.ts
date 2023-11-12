import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing/landing.component';
import { HomeComponent } from './modules/home/home/home.component';
import { Error404Component } from './modules/standalones/error404/error404.component';
import { authGuard } from './core/services/guard/auth-guard.service';
import { ProfileComponent } from './modules/profile/profile/profile.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () => import("./modules/home/home.module").then(m => m.HomeModule),
    canActivate: [authGuard]
  },
  {
    path: 'landing',
    component: LandingComponent,
    loadChildren: () => import("./modules/landing/landing.module").then(m => m.LandingModule)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    loadChildren: () => import("./modules/profile/profile.module").then(m => m.ProfileModule),
    canActivate: [authGuard]
  },
  {
    path: 'error404',
    component: Error404Component
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'error404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

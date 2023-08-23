import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegisterComponent} from "./register/register.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {MovieLayoutComponent} from "./movie-layout/movie-layout.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {ConfirmComponent} from "./confirm/confirm.component";
import {ThanksComponent} from "./thanks/thanks.component";
import {confirmGuardGuard} from "./confirm-guard.guard";
import {thanksGuardGuard} from "./thanks-guard.guard";
import {CorporateLoginComponent} from "./corporate-login/corporate-login.component";
import {CorporateMainComponent} from "./corporate-main/corporate-main.component";
import {CorporateUsersComponent} from "./corporate-users/corporate-users.component";
import {CorporateMoviesComponent} from "./corporate-movies/corporate-movies.component";
import {CorporateBookingsComponent} from "./corporate-bookings/corporate-bookings.component";
import {CorporateMoviesEditComponent} from "./corporate-movies-edit/corporate-movies-edit.component";
import {CorporateMoviesAddComponent} from "./corporate-movies-add/corporate-movies-add.component";
import {corporateCheckGuard} from "./corporate-check.guard";
import {PaymentModuleComponent} from "./payment-module/payment-module.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path:'login', component: LoginPageComponent
  },
  {
    path:'register', component: RegisterComponent
  },
  {
    path:'main', component: MainPageComponent
  },
  {
    path: 'movies', component: MovieLayoutComponent
  },
  {
    path: 'movies/:movieTitle', component: MovieDetailsComponent
  },
  {
    path: 'confirm', component: ConfirmComponent, canActivate: [confirmGuardGuard]
  },
  {
    path:'thanks', component: ThanksComponent, canActivate: [thanksGuardGuard]
  },
  {
    path: 'corporate/login', component: CorporateLoginComponent
  },
  {
    path: 'corporate',
    redirectTo: 'corporate/login',
    pathMatch: 'full'
  },
  {
    path: 'corporate/main',
    component: CorporateMainComponent,
    children: [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: 'users', component: CorporateUsersComponent, canActivate: [corporateCheckGuard] },
      { path: 'movies', component: CorporateMoviesComponent, canActivate: [corporateCheckGuard] },
      { path: 'movies/edit/:movieId', component: CorporateMoviesEditComponent, canActivate: [corporateCheckGuard]},
      { path: 'movies/add', component: CorporateMoviesAddComponent, canActivate: [corporateCheckGuard]},
      { path: 'bookings', component: CorporateBookingsComponent, canActivate: [corporateCheckGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

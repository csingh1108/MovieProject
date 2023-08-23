import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { MainPageComponent } from './main-page/main-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatCardModule} from "@angular/material/card";
import { MovieLayoutComponent } from './movie-layout/movie-layout.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ThanksComponent } from './thanks/thanks.component';
import { CorporateLoginComponent } from './corporate-login/corporate-login.component';
import { CorporateMainComponent } from './corporate-main/corporate-main.component';
import { HeaderComponent } from './header/header.component';
import { CorporateUsersComponent } from './corporate-users/corporate-users.component';
import { CorporateMoviesComponent } from './corporate-movies/corporate-movies.component';
import { CorporateBookingsComponent } from './corporate-bookings/corporate-bookings.component';
import { CorporateHeaderComponent } from './corporate-header/corporate-header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { CorporateMoviesEditComponent } from './corporate-movies-edit/corporate-movies-edit.component';
import { CorporateMoviesAddComponent } from './corporate-movies-add/corporate-movies-add.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import { PaymentModuleComponent } from './payment-module/payment-module.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterComponent,
    MainPageComponent,
    MovieCardComponent,
    MovieLayoutComponent,
    MovieDetailsComponent,
    ConfirmComponent,
    ThanksComponent,
    CorporateLoginComponent,
    CorporateMainComponent,
    HeaderComponent,
    CorporateUsersComponent,
    CorporateMoviesComponent,
    CorporateBookingsComponent,
    CorporateHeaderComponent,
    CorporateMoviesEditComponent,
    CorporateMoviesAddComponent,
    PaymentModuleComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        MatMenuModule,
        MatCardModule,
        MatIconModule,
        MatCheckboxModule,
        MatDividerModule,
        MatSliderModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

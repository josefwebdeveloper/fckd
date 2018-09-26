﻿import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// used to create fake backend
// import { fakeBackendProvider } from './_helpers';

import { AppComponent } from "./app.component";
import { routing } from "./app.routing";

import { AlertComponent } from "./_directives";
import { AuthGuard } from "./_guards";
import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AlertService, AuthenticationService, UserService } from "./_services";
import { HomeComponent } from "./home";
import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";

import { MDBBootstrapModule } from "angular-bootstrap-md";
import { NavbarComponent } from "./navbar/navbar.component";

import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CalendarComponent } from "./calendar/calendar.component";
import { DemoUtilsModule } from "./calendar/module";
// import { DemoComponent } from "./component";

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoUtilsModule
  ],

  schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    CalendarComponent
  ],
  exports: [CalendarComponent],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

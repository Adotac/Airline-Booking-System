import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { UserpageComponent } from './screens/userpage/userpage.component';
import { AdminpageComponent } from './screens/adminpage/adminpage.component';
import { AuthPageComponent } from './screens/auth-page/auth-page.component';
import { LoginComponent } from './screens/auth-page/login/login.component';
import { RegisterComponent } from './screens/auth-page/register/register.component';
import { AdminFlightsComponent } from './screens/adminpage/admin-flights/admin-flights.component';
import { AdminBookingsComponent } from './screens/adminpage/admin-bookings/admin-bookings.component';
import { UserFlightsComponent } from './screens/userpage/user-flights/user-flights.component';
import { UserBookingsComponent } from './screens/userpage/user-bookings/user-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    UserpageComponent,
    AdminpageComponent,
    AuthPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminFlightsComponent,
    AdminBookingsComponent,
    UserFlightsComponent,
    UserBookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

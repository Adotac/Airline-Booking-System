import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { UserpageComponent } from './screens/userpage/userpage.component';
import { AdminpageComponent } from './screens/adminpage/adminpage.component';
import { AuthPageComponent } from './screens/auth-page/auth-page.component';
import { LoginComponent } from './screens/auth-page/login/login.component';
import { RegisterComponent } from './screens/auth-page/register/register.component';
import { AdminFlightsComponent } from './screens/adminpage/admin-flights/admin-flights.component';
import { AdminBookingsComponent } from './screens/adminpage/admin-bookings/admin-bookings.component';
import { UserFlightsComponent } from './screens/userpage/user-flights/user-flights.component';
import { UserBookingsComponent } from './screens/userpage/user-bookings/user-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterTestingModule } from '@angular/router/testing';
// test angularfire
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

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
    UserBookingsComponent,
  ],
  imports: [
    RouterTestingModule,
    RouterModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

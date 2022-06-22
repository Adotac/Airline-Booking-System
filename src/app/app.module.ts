import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
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
import { RouterTestingModule } from '@angular/router/testing';
// test angularfire
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';

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
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

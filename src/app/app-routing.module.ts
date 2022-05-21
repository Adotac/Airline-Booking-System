import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminBookingsComponent } from './screens/adminpage/admin-bookings/admin-bookings.component';
import { AdminFlightsComponent } from './screens/adminpage/admin-flights/admin-flights.component';
import { AdminpageComponent } from './screens/adminpage/adminpage.component';
import { AuthPageComponent } from './screens/auth-page/auth-page.component';
import { LoginComponent } from './screens/auth-page/login/login.component';
import { RegisterComponent } from './screens/auth-page/register/register.component';
import { UserpageComponent } from './screens/userpage/userpage.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserpageComponent,
  },
  {
    path: 'admin',
    component: AdminpageComponent,
    children: [
      { path: '', redirectTo: 'flights', pathMatch: 'full' },
      {
        path: 'flights',
        component: AdminFlightsComponent,
      },
      {
        path: 'bookings',
        component: AdminBookingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

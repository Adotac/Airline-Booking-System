import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flights } from 'src/app/models/flights.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.scss'],
})
export class AdminBookingsComponent implements OnInit {
  constructor(private ABS_service: ABSFirebaseService) {}
  retrieveUsers$?: Subscription;

  userBooking?: Flights[];
  users?: UserAccount[];

  retrieveFlight$?: Subscription;
  flights?: Flights[];

  retrieveFlights() {
    this.retrieveFlight$ = this.ABS_service.getAllFlights().subscribe(
      (data) => {
        this.flights = data;
      }
    );
  }

  ngOnInit(): void {
    this.retrieveFlights();
    this.retrieveUsers();
  }

  ngOnDestroy(): void {
    this.retrieveFlight$?.unsubscribe();
    this.retrieveUsers$?.unsubscribe();
  }

  // retrieveFlights() {
  //   this.retrieveFlight$ = this.ABS_service.getAllFlights().subscribe(
  //     (data) => {
  //       this.flights = data;
  //     }
  //   );
  // }
  // this.done();

  retrieveUsers() {
    this.retrieveUsers$ = this.ABS_service.getAllUsers().subscribe((data) => {
      this.users = data;
    });
    this.done();
  }

  onClickedUser(bookings: any) {
    var tempBookings: Flights[] = [];
    for (var i = 0; bookings.length > i; i++) {
      for (let flight of this.flights!) {
        if (bookings[i] == flight.flight_code) {
          tempBookings.push(flight);
        }
      }
    }

    this.userBooking = tempBookings;
  }

  done() {}
}

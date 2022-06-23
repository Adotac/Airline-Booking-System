import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';

import { Flights } from 'src/app/models/flights.model';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { UserAccount } from 'src/app/models/user-account.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss'],
})
export class UserBookingsComponent implements OnInit {
  flights?: Flights[];
  user?: UserAccount;
  selectedFlight?: Flights;

  // mock user
  currentUserID = 'random';

  constructor(
    public authService: AuthService,
    private ABS_service: ABSFirebaseService
  ) {}

  ngOnInit(): void {
    console.log('ngOnit');
    // console.log(this.authService.userData);

    this.retrieveUser(this.authService.userData.uid);
  }

  //done
  retrieveFlights(user: UserAccount) {
    console.log('user flights!');
    // console.log(this.user);
    let tempFlightCodes: Array<string> = Array.from(user.flightCode_bookings!);
    // console.log(tempFlightCodes);
    
    try{
      const o = this.ABS_service.getAllFlights().subscribe((data) => {
        const intersection = data.filter((flight_code) => {
          // console.log(flight_code.flight_code)
          return tempFlightCodes.includes(flight_code.flight_code!);
        });
  
        this.flights = intersection;
        // console.log(intersection);
        o.unsubscribe();
      });
      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
    
  }

  // NOT YET DONE
  retrieveUser(userID: string) {
    console.log('retrieving userID');
    console.log(userID);
    const o = this.ABS_service.getUser(userID).subscribe((data) => {
      //undfined na diri
      // console.log('data[0]');
      this.user = data[0];
      // console.log(data[0]);
      // console.log(this.user);
      this.retrieveFlights(this.user);
      o.unsubscribe();
    });
  }

  //partial done
  deleteBookingUser(fCode: string | undefined) {
    console.log(fCode);
    if (typeof fCode == undefined) return false;

    try {
      this.ABS_service.deleteFlightFromUser(fCode);
      console.log('deleted!!');

      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  }
}

import { Component, OnInit } from '@angular/core';

import { CrudReturn } from 'src/app/models/crud-return';
import { Flights } from 'src/app/models/flights.model';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { UserAccount } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  flights?: Flights[];
  users?: UserAccount[];
  selectedFlight?: Flights;

  constructor(private ABS_service: ABSFirebaseService) { }

  ngOnInit(): void {
    this.retrieveFlights();
  }

  retrieveFlights(){
    this.ABS_service.getAllFlights().subscribe(data=>{
      this.flights = data;
      // console.log(data)
    });
  }

}

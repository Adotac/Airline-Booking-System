import { Component, OnInit } from '@angular/core';
import { filter, find, map, tap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CrudReturn } from 'src/app/models/crud-return';
import { Flights } from 'src/app/models/flights.model';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { UserAccount } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss']
})
export class UserFlightsComponent implements OnInit {
  // flights?: Flights[];
  // users?: UserAccount[];
  selectedFlight?: Flights;
  current_index = -1;

  errorFormInput = '';

  constructor(private ABS_service: ABSFirebaseService) { }
  
  date!: Date;
  ngOnInit(): void {
    this.date = new Date(2021, 9, 4, 5, 6, 7);
  }

  flightForm: FormGroup = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    arivalDate: new FormControl('', Validators.required),
    arivalTime: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
  });

  retrieveFlights(){
    // console.log("retrieve flights!!")
    return this.ABS_service.getAllFlights();
  }
  retrieveUsers(){
    // console.log("retrieve users!!")
    return this.ABS_service.getAllUsers();
  }

  searchFlights(){
    if (
      !((this.flightForm.value.origin && this.flightForm.value.origin.trim()) 
        || (this.flightForm.value.destination &&  this.flightForm.value.destination.trim()) )
    ) {
      if (
        this.flightForm.value.departureDate ||this.flightForm.value.arivalDate 
        ||this.flightForm.value.departureTime ||this.flightForm.value.arivalTime
      )
      {
        if (
          !(
            this.ABS_service.isGoodDate(this.flightForm.value.departureDate) ||
            this.ABS_service.isGoodDate(this.flightForm.value.arivalDate) ||
            this.ABS_service.isGoodTime(this.flightForm.value.departureTime) ||
            this.ABS_service.isGoodTime(this.flightForm.value.arivalTime)
          )
        ) {
          this.errorFormInput = 'date or/and time is not valid';
          return;
        }
        else{
          this.errorFormInput = '';
          return;
        }
      }


      this.errorFormInput = 'empty fields';
    }
    else{
      this.errorFormInput = '';
    }
  }



  async addBookingToUser(flightCode: any, userID:string){
    var tempID = "ZL4BwNXyxrl89EtdI9ac";
    var crud = this.ABS_service.getFlight(flightCode);
      if (crud.data.flight_code == flightCode)
        await this.ABS_service.updateUserBookings(crud.data, tempID);

  }

}

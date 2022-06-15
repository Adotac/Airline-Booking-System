import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Flights } from 'src/app/models/flights.model';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { UserAccount } from 'src/app/models/user-account.model';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss']
})
export class UserFlightsComponent implements OnInit, OnDestroy, OnChanges {
  //Don't delete important observable threads
  retrieveFlight$?: Subscription;
  //

  flights?: Flights[];
  users?: UserAccount[];

  errorFormInput = '';

  constructor(private ABS_service: ABSFirebaseService) { }
  
  ngOnInit(): void {
    this.retrieveFlights();
    // console.log(this.flights);
  }

  ngOnChanges(): void {
    
  }

  ngOnDestroy(): void {
    this.retrieveFlight$?.unsubscribe();
  }

  flightForm: FormGroup = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
  });

  retrieveFlights(){
    this.retrieveFlight$ = this.ABS_service.getAllFlights().subscribe(data=>{
      this.flights = data;
      // console.log(data)
      // this.retrieveFlight$?.unsubscribe();
    });
  }

  searchFlights(){
    // console.log("pressed search@!!");
    let org = this.flightForm.value.origin.trim().toLocaleLowerCase();
    let dest = this.flightForm.value.destination.trim().toLocaleLowerCase();
    if (
      !((this.flightForm.value.origin && this.flightForm.value.origin.trim()) 
        || (this.flightForm.value.destination &&  this.flightForm.value.destination.trim()) )
    ) 
    {
      if (
        this.flightForm.value.departureDate ||this.flightForm.value.arivalDate 
        ||this.flightForm.value.departureTime ||this.flightForm.value.arivalTime
      )
      {        
        this.errorFormInput = '';
        // end condition block 
      }
      else{
        this.retrieveFlights();
        this.errorFormInput = 'empty fields';
        return;
      }
    }
    else{
      this.errorFormInput = '';
    }
    var tempFlights = this.flights?.filter(function(e){
      return e.origin_name?.toLocaleLowerCase().match(org) != null &&
      e.dest_name?.toLocaleLowerCase().match(dest) != null 
    });

    console.log(tempFlights);
    this.flights = tempFlights;
  }



  addBookingToUser(flightCode: any, userID:string){
    try{
      var temp:Flights;
      const o = this.ABS_service.getFlight(flightCode).subscribe( (sdata) =>{
        console.log("get flight subscribe after filter!");
        // console.log(sdata);
        temp = sdata[0];
        console.log("user flight");
        console.log(temp);
  
        this.ABS_service.updateUserBookings(temp, userID);
        o.unsubscribe();
        return true;
      });
    }
    catch(error){
      console.log(error);
    }

    return false;
  }

}

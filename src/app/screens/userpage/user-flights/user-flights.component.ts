import { Component, OnInit } from '@angular/core';
import { Flights } from 'src/app/models/flights.mpodel';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, pipe } from 'rxjs';
import { filter, find, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss']
})
export class UserFlightsComponent implements OnInit {
  flights?: Flights[];
  selectedFlight?: Flights;
  current_index = -1;

  constructor(private ABS_service: ABSFirebaseService) { }
  
  date!: Date;
  ngOnInit(): void {
    this.date = new Date(2021, 9, 4, 5, 6, 7);
    this.retrieveFlights()
  }

  retrieveFlights(){
    console.log("retrieve flights!!")
    this.ABS_service.getAllFlights().snapshotChanges().pipe(
      map(changes => 
        changes.map(c=>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})  
        )  
      )
    ).subscribe(data=>{
      this.flights = data;
    })
  }

}

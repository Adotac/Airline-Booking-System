import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, pipe } from 'rxjs';
import { filter, find, map, tap } from 'rxjs/operators';

import { CrudReturn } from '../models/crud-return';
import { Flights } from '../models/flights.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class ABSFirebaseService {
  private flightsCollection: AngularFirestoreCollection<Flights>;
  private userCollection: AngularFirestoreCollection<UserAccount>;

  private flights?: Flights[];
  private users?: UserAccount[];

  constructor(private afs: AngularFirestore) {
    this.flightsCollection = this.afs.collection<Flights>('Flights');
    this.userCollection = this.afs.collection<UserAccount>('UserAccounts');
  
  }

  getAllFlights(){
    this.flightsCollection.snapshotChanges().pipe(
      map(changes => 
        changes.map(c=>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})  
        )  
      )
    ).subscribe(data=>{
      this.flights = data;
    });

    return this.flights;
  }
  getAllUsers(){
    this.userCollection.snapshotChanges().pipe(
      map(changes => 
        changes.map(c=>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})  
        )  
      )
    ).subscribe(data=>{
      this.users = data;
    });

    return this.users;
  }
  getUser(userID: string): CrudReturn{
    for (let user of this.users!) {
      if (user.userID == userID) {
        return {success:true, data:user};
      }
    }
    return {success:true, data:'error GetFlight'};
  }
  getFlight(flightCode: string): CrudReturn{
    for (let flight of this.flights!) {
      if (flight.flight_code == flightCode) {
        return {success:true, data:flight};
      }
    }
    return {success:true, data:'error GetFlight'};
  }

  addNewFlight(flight: Flights) {
    try {
      this.afs.collection('Flights').doc(flight['flight_code']).set(flight);
    } catch (error) {
      console.log(error);
    }
  }

  updateFlightStatus(flightCode: string) {
    try {
      this.afs
        .collection('Flights')
        .doc(flightCode)
        .update({ status: 'Cancelled' });
      console.log(flightCode);
    } catch (error) {
      console.log(error);
    }
  }

  updateUserBookings(flight: Flights, userID: string) {
    
    try {
      var codes = this.getUser(userID).data.flightCode_bookings;
      codes.push(flight.flight_code);

      this.afs
        .collection('UserAccounts')
        .doc(userID)
        .update({ flightCode_bookings: codes });
    } catch (error) {
      console.log(error);
    }
  }


  /////--- Miscellaneous -------////
  isGoodDate(dt: string) {
    var reGoodDate =
      /^\b((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    return reGoodDate.test(dt);
  }

  isGoodTime(dt: string) {
    var reGoodDate = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return reGoodDate.test(dt);
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Observable, pipe, forkJoin } from 'rxjs';
import { filter, find, map, tap, mergeMap  } from 'rxjs/operators';

import { Flights } from '../models/flights.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class ABSFirebaseService{
  constructor(private afs: AngularFirestore) {}

  getAllFlights(): Observable<Flights[]> {
    return this.afs.collection<Flights>('Flights').valueChanges();
  }

  getAllUsers():  Observable<UserAccount[]> {
    return this.afs.collection<UserAccount>('UserAccounts').valueChanges();
  }

  getUser(uid: string): Observable<UserAccount[]>{
    const o = this.afs.collection<UserAccount>('UserAccounts', ref => ref.where('id', '==', uid)).valueChanges();
    return o;
  }
  getFlight(flightCode: string): Observable<Flights[]> {
    const o = this.afs.collection<Flights>('Flights', ref => ref.where('flight_code', '==', flightCode)).valueChanges();
    return o;
  }

  //Not added 
  addNewFlight(flight: Flights) {
    try {
      this.afs.collection('Flights').doc(flight['flight_code']).set(flight);
      console.log("ADDED");

      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  deleteFlightFromUser(fCode: any){

    try {
      const tempuser = JSON.parse(localStorage.getItem('user')!);
      let newCodes, tempData;
      const o = this.getUser(tempuser.uid).subscribe( (sdata) => {
        const codes:any = sdata[0].flightCode_bookings;
        newCodes = Array.from(codes); //shallow copy
        const index = newCodes.indexOf(fCode);

        if (index !== -1){
          newCodes.splice(index,1);
        }
        // console.log(newCodes);
        this.afs
          .collection('UserAccounts')
          .doc(sdata[0].id)
          .update({ flightCode_bookings: newCodes });
        o.unsubscribe();

        return true;    
      });

    } catch (error) {
      console.log(error);
    }
    return false;
  }
  

  // Chnage later into updateFlightStatus(flightCode: string, status: string)
  updateFlightStatus(flightCode: string) {
    try {
      this.afs
        .collection('Flights')
        .doc(flightCode)
        .update({ status: 'Cancelled' });
      // console.log(flightCode);
      return true;
    } catch (error) {
      console.log(error);
    }
    return false;
  }

  updateUserBookings(flight: Flights) {
    try {
      const tempuser = JSON.parse(localStorage.getItem('user')!);
      console.log(flight);

      let newCodes, tempData;
      const o = this.getUser(tempuser.uid).subscribe( (sdata) => {
        tempData = sdata[0];
        const codes:any = sdata[0].flightCode_bookings;
        // codes.push(flight.flight_code);
        // console.log(typeof(sdata));
        console.log(sdata[0]);

        const exists = sdata[0].flightCode_bookings?.find((val)=>val===flight.flight_code);
        // console.log("exists: " + exists);
        if (exists != undefined){
          alert("You have already booked the selected flight!")
          o.unsubscribe();

          return false
        }

        newCodes = [...codes, flight.flight_code]
        // console.log(newCodes);
        this.afs
          .collection('UserAccounts')
          .doc(sdata[0].id)
          .update({ flightCode_bookings: newCodes });
        o.unsubscribe();

        return true;    
      });

    } catch (error) {
      console.log(error);
    }
    return false;
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

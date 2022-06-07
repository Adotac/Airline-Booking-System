import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import { Observable, pipe, forkJoin } from 'rxjs';
import { filter, find, map, tap, mergeMap  } from 'rxjs/operators';

import { CrudReturn } from '../models/crud-return';
import { Flights } from '../models/flights.model';
import { UserAccount } from '../models/user-account.model';

@Injectable({
  providedIn: 'root',
})
export class ABSFirebaseService {
  private flightsCollection: AngularFirestoreCollection<Flights>;
  private userCollection: AngularFirestoreCollection<UserAccount>;

  // private flights?: Flights[];
  // private users?: UserAccount[];

  constructor(private afs: AngularFirestore) {
    this.flightsCollection = this.afs.collection<Flights>('Flights');
    this.userCollection = this.afs.collection<UserAccount>('UserAccounts');
  }

  getAllFlights() {
    const o = this.flightsCollection
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );

    return o;
  }
  getAll_AvailableFlights() {
    const o = this.flightsCollection
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );

    return o;
  }

  getAllUsers() {
    const o = this.userCollection
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      );

    return o;
  }

  getUser(id: string){
    // try{
    //   this.userCollection.snapshotChanges().pipe(
    //     map(changes => 
    //       changes.map(c=>
    //         ({id: c.payload.doc.id, ...c.payload.doc.data()})  
    //       ).filter( (selectedUser:UserAccount) => selectedUser.userID == userID)
    //     )
    //   ).subscribe( sdata =>{
    //     console.log("get flight subscribe after filter!");
    //     console.log(sdata);
    //     return {success:true, data:sdata};
    //   });


    // }
    // catch(error){
    //   console.log(error);
    // }
    // return {success:false, data:'error getFlight'};

    const o = this.userCollection.snapshotChanges().pipe(
      map(changes => 
        changes.map(c=>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})  
        ).filter( (selectedUser:UserAccount) => 
        selectedUser.userID == id)
        )
      );
    
    return o;
  }
  getFlight(flightCode: string) {
    // fuck this subscribe shit HAHAHAH
    // var tempData:any;
    // var tempBool:boolean = false;
    // try{
    //   this.flightsCollection.snapshotChanges().pipe(
    //     map(changes => 
    //       changes.map(c=>
    //         ({id: c.payload.doc.id, ...c.payload.doc.data()})  
    //       ).filter( (selectedFlight:Flights) => 
    //       selectedFlight.flight_code == flightCode
    //       )
    //     )
    //   ).subscribe( sdata =>{
    //     console.log("get flight subscribe after filter!");
    //     console.log(sdata);
    //     tempData = sdata;
    //     tempBool = true;
    //   });
    // }
    // catch(error){
    //   console.log(error);
    //   tempData = error;
    //   tempBool = false;
    // }

    const o = this.flightsCollection.snapshotChanges().pipe(
      map(changes => 
        changes.map(c=>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})  
        ).filter( (selectedFlight:Flights) => 
        selectedFlight.flight_code == flightCode
        )
      )
    );
    
    return o;
    // console.log(tempData);
    // return {success:tempBool, data:tempData};
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
      let newCodes, tempData;
      const o = this.getUser(userID).subscribe( (sdata) => {
        tempData = sdata[0];
        const codes:any = sdata[0].flightCode_bookings;
        // codes.push(flight.flight_code);
        console.log(typeof(sdata));
        console.log(sdata[0].id);

        newCodes = [...codes, flight.flight_code]
        console.log(newCodes);
        this.afs
          .collection('UserAccounts')
          .doc(sdata[0].id)
          .update({ flightCode_bookings: newCodes });

          o.unsubscribe();
      });
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

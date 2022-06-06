import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, pipe } from 'rxjs';
import { filter, find, map, tap } from 'rxjs/operators';

import { Flights } from '../models/flights.mpodel';

@Injectable({
  providedIn: 'root',
})
export class ABSFirebaseService {
  private flightsCollection: AngularFirestoreCollection<Flights>;
  flight$?: Observable<Flights[]>;

  constructor(private afs: AngularFirestore) {
    this.flightsCollection = this.afs.collection<Flights>('Flights');
    this.flight$ = this.flightsCollection.valueChanges();
  }

  getAllFlights(): AngularFirestoreCollection<Flights> {
    return this.flightsCollection;
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

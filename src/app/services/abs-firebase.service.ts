import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, pipe } from 'rxjs';
import { filter, find, map, tap } from 'rxjs/operators';

import { Flights } from '../models/flights.mpodel';

@Injectable({
  providedIn: 'root'
})
export class ABSFirebaseService {
  private flightsCollection: AngularFirestoreCollection<Flights>;
  flight$?: Observable<Flights[]>;

  constructor(private afs: AngularFirestore) { 
    this.flightsCollection = this.afs.collection<Flights>('FlightsDB');
    this.flight$ = this.flightsCollection.valueChanges();
  }

  getAllFlights(): AngularFirestoreCollection<Flights>{
    return this.flightsCollection;
  }
}

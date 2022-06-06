import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DatabaseQuery } from 'src/app/firebase.database';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { filter, find, map, tap } from 'rxjs/operators';
import { Flights } from 'src/app/models/flights.mpodel';
import { setTokenAutoRefreshEnabled } from '@firebase/app-check';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.scss'],
})
export class AdminFlightsComponent implements OnInit {
  flights?: Flights[];
  flightCode?: string;
  searchflightCode = '';
  errorCodeInput = '';
  errorFormInput = '';
  constructor(private ABS_service: ABSFirebaseService) {}
  ngOnInit(): void {
    this.retrieveFlights();
    this.generateFlightCode();
  }

  flightForm: FormGroup = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    arivalDate: new FormControl('', Validators.required),
    arivalTime: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
  });

  printSelected(selected: any) {
    console.log(selected);
  }
  

  stringToDateTime(date: string, time: string) {
    const [month, day, year] = date.split('/');
    const [hours, minutes] = time.split(':');

    const newDate = new Date(+year, +month - 1, +day, +hours, +minutes, +0);
    return newDate;
  }

  generateFlightCode() {
    var dateNow = new Date().valueOf().toString();
    var id = dateNow.substring(dateNow.length - 5, dateNow.length);

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var A = alphabet[Math.floor(Math.random() * alphabet.length)];
    var B = alphabet[Math.floor(Math.random() * alphabet.length)];

    this.flightCode = `${A}${B}-${id}`;
  }

  addFlightToDB() {
    // this.flightForm.value.origin = 'Moscow, Russia';
    // this.flightForm.value.destination = 'Kyiv, Ukraine';
    // this.flightForm.value.departureDate = '06/02/2022';
    // this.flightForm.value.departureTime = '10:11';
    // this.flightForm.value.arivalDate = '06/03/2022';
    // this.flightForm.value.arivalTime = '13:42';
    this.formToJson();
  }

  private async formToJson(): Promise<any> {
    var attributes = new Map<string, any>();

    if (
      !(
        this.flightForm.value.origin &&
        this.flightForm.value.origin.trim() &&
        this.flightForm.value.destination &&
        this.flightForm.value.destination.trim()
      )
    ) {
      this.errorFormInput = 'empty fields';
      return;
    }

    if (
      !(
        this.ABS_service.isGoodDate(this.flightForm.value.departureDate) &&
        this.ABS_service.isGoodDate(this.flightForm.value.arivalDate) &&
        this.ABS_service.isGoodTime(this.flightForm.value.departureTime) &&
        this.ABS_service.isGoodTime(this.flightForm.value.arivalTime)
      )
    ) {
      this.errorFormInput = 'date or/and time is not valid';
      return;
    }

    attributes.set('origin_name', this.flightForm.value.origin.trim());
    attributes.set('dest_name', this.flightForm.value.destination.trim());

    var departure = this.stringToDateTime(
      this.flightForm.value.departureDate,
      this.flightForm.value.departureTime
    );
    var arival = this.stringToDateTime(
      this.flightForm.value.arivalDate,
      this.flightForm.value.arivalTime
    );
    attributes.set('flight_code', this.flightCode);
    attributes.set('depart_time', departure);
    attributes.set('arrival_time', arival);
    attributes.set('status', 'Active');

    console.log(attributes.size);
    if (attributes.size <= 0) {
      this.errorFormInput = 'empty fields';
      return null;
    }
    this.errorFormInput = '';
    await this.ABS_service.addNewFlight(this.mapToObject(attributes));
  }

  public async cancelFlight(code: string) {
    for (let flight of this.flights!) {
      if (flight.flight_code == code.trim()) {
        await this.ABS_service.updateFlightStatus(code);
        flight.status = 'Cancelled';
        this.errorCodeInput = '';
        return;
      }
    }

    this.errorCodeInput = 'flight code not found';
    console.log(this.errorCodeInput);
  }
  private retrieveFlights() {
    console.log('retrieve flights!!');
    this.ABS_service.getAllFlights()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.flights = data;
      });
  }

  private mapToObject(map: any) {
    const out = Object.create(null);
    map.forEach((value: any, key: string | number) => {
      if (value instanceof Map) {
        out[key] = this.mapToObject(value);
      } else {
        out[key] = value;
      }
    });
    return out;
  }
}

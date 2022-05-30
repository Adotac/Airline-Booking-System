import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './admin-flights.component.html',
  styleUrls: ['./admin-flights.component.scss'],
})
export class AdminFlightsComponent implements OnInit {
  ngOnInit(): void {}

  createFlightForm: FormGroup = new FormGroup({
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    arivalDate: new FormControl('', Validators.required),
    arivalTime: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
  });

  formTest() {
    // console.log(this.isGoodDate(this.createFlightForm.value.departureDate));
    // console.log(this.isGoodDate(this.createFlightForm.value.arivalDate));

    console.log(this.isGoodTime(this.createFlightForm.value.departureTime));
    console.log(this.isGoodTime(this.createFlightForm.value.arivalTime));
    // console.log(this.createFlightForm.value.origin);
    // console.log(this.createFlightForm.value.destination);
    // console.log(this.createFlightForm.value.arivalDate);
    // console.log(this.createFlightForm.value.arivalTime);
    // console.log(this.createFlightForm.value.departureDate);
    // console.log(this.createFlightForm.value.departureTime);
    this.stringToDateTime(
      this.createFlightForm.value.departureDate,
      this.createFlightForm.value.departureTime
    );
  }

  isGoodDate(dt: string) {
    var reGoodDate =
      /^\b((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
    return reGoodDate.test(dt);
  }

  isGoodTime(dt: string) {
    var reGoodDate = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return reGoodDate.test(dt);
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

    console.log(A + B + '-' + id);
  }
}

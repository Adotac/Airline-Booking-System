import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-flights',
  templateUrl: './user-flights.component.html',
  styleUrls: ['./user-flights.component.scss']
})
export class UserFlightsComponent implements OnInit {

  constructor() { }
  
  date!: Date;
  ngOnInit(): void {
    this.date = new Date(2021, 9, 4, 5, 6, 7);
  }

}

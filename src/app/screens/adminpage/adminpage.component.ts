import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss'],
})
export class AdminpageComponent implements OnInit {
  bookingClicked: boolean = false;
  flightsClicked: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.flightsClicked = true;
  }
  flights() {
    this.router.navigate(['flights'], { relativeTo: this.route });
    this.flightsClicked = true;
    this.bookingClicked = false;
  }
  bookings() {
    this.router.navigate(['bookings'], { relativeTo: this.route });
    this.flightsClicked = false;
    this.bookingClicked = true;
  }
}

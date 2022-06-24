import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss'],
})
export class AdminpageComponent implements OnInit {
  bookingClicked: boolean = false;
  flightsClicked: boolean = false;
  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

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

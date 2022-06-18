import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss'],
})
export class UserpageComponent implements OnInit {
  bookingClicked: boolean = false;
  flightsClicked: boolean = false;
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
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

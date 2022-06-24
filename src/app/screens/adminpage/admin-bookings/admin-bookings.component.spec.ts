import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Flights } from 'src/app/models/flights.model';

import { UserAccount } from 'src/app/models/user-account.model';
import { ABSFirebaseService } from 'src/app/services/abs-firebase.service';
import { environment } from 'src/environments/environment';

import { AdminBookingsComponent } from './admin-bookings.component';
describe('AdminBookingsComponent', () => {
  let service: ABSFirebaseService;
  let component: AdminBookingsComponent;
  let fixture: ComponentFixture<AdminBookingsComponent>;

  var mockFlights: Flights[] = [
    {
      flight_code: 'AB-02943',
      origin_name: 'Cebu',
      dest_name: 'Japan',
      depart_time: '2:00',
      arrival_time: '3:00',
      status: 'Available',
    },
  ];

  var mockUsers: UserAccount[] = [
    {
      flightCode_bookings: ['IW-82214', 'HH-95575', 'GP-20441'],
      userID: 'random',
      username: 'pinakagwapo',
      id: 'random',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBookingsComponent],
      providers: [AdminBookingsComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
    }).compileComponents();
    service = TestBed.get(ABSFirebaseService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should check if the labels for the "Users" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#users-label')
    ).nativeElement;

    fixture.detectChanges();

    expect(firstLabel.textContent).toBe(' Users');
  });

  it('Should check if the labels for the "Flights" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#flight-label')
    ).nativeElement;
    fixture.detectChanges();

    expect(firstLabel.textContent).toBe(' Flights');
  });

  it('Should populate empty component onClickedUser() when called ', (done) => {
    component.flights = [{ flight_code: 'test' }, { flight_code: 'test' }];
    let spy = spyOn(component, 'onClickedUser').and.callThrough();

    component.onClickedUser(['AB-02943', 'DB-1241']);
    fixture.detectChanges();

    expect(component.userBooking).toBeDefined();
    expect(spy).toHaveBeenCalled();
    done();
  });

  it('Should populate userBooking onClickedUser() when called ', (done) => {
    component.flights = mockFlights;
    let userBookings = ['AB-02943', 'AB-02941'];
    component.onClickedUser(userBookings);

    expect(component.userBooking).toEqual(mockFlights);
    done();
  });

  it('should get single flight data when getFlight() is called', (done) => {
    const tempId = 'random1';
    let spy = spyOn(service, 'getFlight').and.returnValue(of(mockFlights));

    setTimeout(() => {
      let user: Flights = {};
      const w$ = service.getFlight(tempId).subscribe((sdata) => {
        user = sdata[0];
      });
      // component.ngOnInit();

      expect(spy).toHaveBeenCalled();
      expect(component.retrieveFlight$).toBeDefined();
      expect(user).toEqual(mockFlights[0]);
      w$.unsubscribe();
      done();
    }, 1000);
  });

  it('should get user data when getUser() is called', (done) => {
    let spy = spyOn(service, 'getUser').and.returnValue(of(mockUsers));

    component.users = [];
    setTimeout(() => {
      let user: UserAccount[];
      const q$ = service.getUser('random').subscribe((sdata) => {
        user = sdata;
      });

      expect(spy).toHaveBeenCalled();

      expect(component.retrieveUsers$).toBeDefined();

      q$.unsubscribe();
      done();
    }, 1000);
  });

  afterEach(() => {
    fixture.destroy();
  });
});

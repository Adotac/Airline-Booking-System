import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule,AngularFirestoreDocument,
    SETTINGS as FS_SETTINGS } from '@angular/fire/compat/firestore';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router,Routes } from '@angular/router';
import { environment } from 'src/environments/environment';


import { By } from '@angular/platform-browser';
import { Observable, of} from 'rxjs';

import { UserBookingsComponent } from './user-bookings.component';

import { AuthService } from 'src/app/services/auth.service';
import { Flights } from 'src/app/models/flights.model';
import { UserAccount } from 'src/app/models/user-account.model';



describe('UserBookingsComponent', () => {
  let component: UserBookingsComponent;
  let fixture: ComponentFixture<UserBookingsComponent>;
  let service: AuthService;
  let rot:Router;

  var mockFlights: Flights[] = [
    {
      flight_code: 'CODE',
      origin_name: 'Cebu',
      dest_name: 'Japan',
      depart_time: '2:00',
      arrival_time: '3:00',
      status: 'Available',
    },
    {
      flight_code: 'IW-82214',
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
      declarations: [UserBookingsComponent],
      imports: [
        RouterTestingModule.withRoutes([]),HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,//AngularFirestoreDocument,
      ],
      providers: [
        {
          provide: FS_SETTINGS,
          useValue: {
            experimentalAutoDetectLongPolling: true,
            useFetchStreams: false,
          },
        },
        AuthService,
      ],
    }).compileComponents();
    rot = TestBed.inject(Router);
    service = TestBed.inject(AuthService);
    // service.SignIn('g@g.com', '123456');

  });

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(mockUsers[0]))
    console.log(service.userData);

    rot.initialNavigation();
    fixture = TestBed.createComponent(UserBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // localStorage.removeItem('user');
    service.SignOut();
  });

  it('should create user-booking-component', (done) => {
    setTimeout(()=>{
      expect(component).toBeTruthy();
      done();
    },500);
  });

  it('should call retrieveFlights() when retrieveUser() is called and flights is not undefined', (done) => {
    // let service = TestBed.inject(ABSFirebaseService);
    let spyF = spyOn(component, 'retrieveFlights').and.callThrough();
    let spyU = spyOn(component, 'retrieveUser').and.callThrough();
    // rot.navigate(['user/bookings']);
    // tick();
    setTimeout(() => {
  
    //   component.retrieveFlights();
      component.ngOnInit();
      fixture.detectChanges(); 
      console.log("service.userData");
      console.log(service.userData);

      expect(spyU).toHaveBeenCalled();
      expect(spyF).toHaveBeenCalled();
    //   expect(component.flights).not.toBe(undefined);
      done();
    }, 1000);
  });

  
});

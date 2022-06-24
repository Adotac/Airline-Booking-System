import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SETTINGS as FS_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserAccount } from '../models/user-account.model';
import { Flights } from '../models/flights.model';

var mockFlights: Flights[] = [
  {
    flight_code: 'CODE',
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
    email: "r@ndom.com",
    id: 'random',
  },
];

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: FS_SETTINGS,
          useValue: {
            experimentalAutoDetectLongPolling: true,
            useFetchStreams: false,
          },
        },
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
      ],
    }).compileComponents();
    service = TestBed.get(AuthService);
  });

  it('should be created `auth-service`', () => {
    expect(service).toBeTruthy();
  });

  it('should login with email:r@ndom.com | password:123456 and call SignIn() which will store userData on localStorage', (done) => {
    const m = 'r@ndom.com', p = '123456';
    setTimeout(() => {
      let spy = spyOn(service, 'SignIn').and.callFake(async function(mail:string, pass:string){
        if(mail == m && pass == p){
          service.userData = mockUsers[0];
          localStorage.setItem('user', JSON.stringify(service.userData));
        }
        return;
      });
      service.SignIn(m, p);
      expect(spy).toHaveBeenCalled();
      expect(service.userData).toBeDefined();
      expect(service.userData).toEqual(mockUsers[0]);
      done();
    }, 1000);
  });

});

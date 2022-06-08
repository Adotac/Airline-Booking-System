import { TestBed } from '@angular/core/testing';
import { SETTINGS as FS_SETTINGS,  } from '@angular/fire/compat/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { ABSFirebaseService } from './abs-firebase.service';
import { UserAccount } from '../models/user-account.model';
import { Flights } from '../models/flights.model';
import { of } from 'rxjs';

var mockFlights:Flights[] = [
  {
    flight_code: 'CODE',
    origin_name: 'Cebu',
    dest_name: 'Japan',
    depart_time: '2:00',
    arrival_time: '3:00',
  }
];
var mockUsers:UserAccount[] = [
  {
    flightCode_bookings: ['IW-82214', 'HH-95575', 'GP-20441'],
    userID: 'random',
    username: 'pinakagwapo',
    id: 'random',
  }
];


describe('ABSFirebaseService', () => {
  let service: ABSFirebaseService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      // declarations: [ABSFirebaseService],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers:[
        { provide: FS_SETTINGS,
          useValue: {
            experimentalAutoDetectLongPolling: true, 
            useFetchStreams: false,
          }
        },
        {
          provide: FIREBASE_OPTIONS, useValue: environment.firebase
        }
      ],
    }).compileComponents();
    service = TestBed.get(ABSFirebaseService);
  });

  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all flight data when getAllFlights() is called', (done) => {
    let spy = spyOn(service, 'getAllFlights').and.returnValue(of(mockFlights));
    setTimeout(()=>{
      let user:Flights[]=[];
      const a$ = service.getAllFlights().subscribe(sdata=>{
        user = sdata;
      });

      expect(spy).toHaveBeenCalled();
      expect(user).toBeDefined();
      expect(user).toEqual(mockFlights);
      a$.unsubscribe();
      done();
    },1000)
  });

  it('should get all user data when getAllUsers() is called', (done) => {
    let spy = spyOn(service, 'getAllUsers').and.returnValue(of(mockUsers));
    setTimeout(()=>{
      let user:UserAccount[]=[];
      const b$ = service.getAllUsers().subscribe(sdata=>{
        user = sdata;
      });

      expect(spy).toHaveBeenCalled();
      expect(user).toBeDefined();
      expect(user).toEqual(mockUsers);
      b$.unsubscribe();
      done();
    },1000)
  });

  it('should get single user data when getUser() is called', (done) => {
    const tempId = 'random1';   
    let spy = spyOn(service, 'getUser').and.returnValue(of(mockUsers));

    setTimeout(()=>{
      let user:UserAccount={};
      const q$ = service.getUser(tempId).subscribe(sdata=>{
        user = sdata[0];
      });

      expect(spy).toHaveBeenCalled();
      expect(user).toBeDefined();
      expect(user).toEqual(mockUsers[0]);
      q$.unsubscribe();
      done();
    },1000)
    
  });

  it('should get single flight data when getFlight() is called', (done) => {
    const tempId = 'random1';   
    let spy = spyOn(service, 'getFlight').and.returnValue(of(mockFlights));
    setTimeout(()=>{
      let user:Flights={};
      const w$ = service.getFlight(tempId).subscribe(sdata=>{
        user = sdata[0];
        
      });
      

      expect(spy).toHaveBeenCalled();
      expect(user).toBeDefined();
      expect(user).toEqual(mockFlights[0]);
      w$.unsubscribe();
      done();
    },1000)
  });



});

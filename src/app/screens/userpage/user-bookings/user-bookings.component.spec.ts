import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule,AngularFirestoreDocument,
    SETTINGS as FS_SETTINGS } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { By } from '@angular/platform-browser';
import { Observable, of} from 'rxjs';
import { UserBookingsComponent } from './user-bookings.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserAccount } from 'src/app/models/user-account.model';

var mockUser: {
    flightCode_bookings: [];
    userID: "NKlVvTFxm4Mwm1FlPdC2LXC7ATw1";
    username: "PinakaGwapo";
    id: "NKlVvTFxm4Mwm1FlPdC2LXC7ATw1";
    uid: "NKlVvTFxm4Mwm1FlPdC2LXC7ATw1";
    email: "g@g.com";
    isAnonymous: false;
  };

fdescribe('UserBookingsComponent', () => {
  let component: UserBookingsComponent;
  let fixture: ComponentFixture<UserBookingsComponent>;
  let service: AuthService;

  let l:any;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBookingsComponent],
      imports: [
        RouterTestingModule,
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
    service = TestBed.inject(AuthService);

  });

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(mockUser));
    fixture = TestBed.createComponent(UserBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // localStorage.removeItem('user');
  });

  it('should create user-booking-component', () => {
    let user = localStorage.getItem('user');
    console.log("sssssssssss\n\n\n\n");
    service.userData = mockUser;
    fixture.detectChanges();

    console.log(service.userData);

    expect(component).toBeTruthy();
  });

  xit('should call retrieveFlights() when retrieveUser() is called and flights is not undefined', (done) => {
    // let service = TestBed.inject(ABSFirebaseService);
    let spy = spyOn(component, 'retrieveFlights').and.callThrough();
    setTimeout(() => {
    service.userData = mockUser;
    console.log("askjd\n\n\nghasd");
    console.log(service.userData);

    //   component.retrieveFlights();
      component.ngOnInit();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.flights).not.toBe(undefined);
      done();
    }, 1000);
  });

  xit('should click `Cancel Booking` button and call deleteBookingUser()', (done) => {
    let spy = spyOn(component, 'deleteBookingUser').and.callThrough();
    // let btn:HTMLElement = fixture.debugElement.query(By.css('#bookFlightBtn')).nativeElement;

    setTimeout(() => {
      // component.retrieveFlights();
      fixture.detectChanges();
      // console.log(component.flights);
      const btn: HTMLElement = fixture.debugElement.query(
        By.css('#cancelUserFlightBtn')
      ).nativeElement;
      expect(btn).toBeDefined();
      btn.click();
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeTruthy();
      done();
    }, 1000);
  });
});

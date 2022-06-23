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


xdescribe('UserBookingsComponent', () => {
  let component: UserBookingsComponent;
  let fixture: ComponentFixture<UserBookingsComponent>;
  let service: AuthService;
  let rot:Router;

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
    service.SignIn('g@g.com', '123456');

  });

  beforeEach(() => {

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
    setTimeout(() => {
        service.SignIn('g@g.com', '123456');

        fixture.detectChanges();
        
        done();
    }, 1000);
    expect(component).toBeTruthy();

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

  it('should click `Cancel Booking` button and call deleteBookingUser()', (done) => {
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

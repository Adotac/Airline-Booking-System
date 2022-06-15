import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreModule,
  SETTINGS as FS_SETTINGS,
} from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserFlightsComponent } from './user-flights.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';

var mockFlights: {
  flight_code: 'CODE';
  origin_name: 'Cebu';
  dest_name: 'Japan';
  depart_time: '2:00';
  arrival_time: '3:00';
};

describe('UserFlightsComponent', () => {
  let component: UserFlightsComponent;
  let fixture: ComponentFixture<UserFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFlightsComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: FS_SETTINGS,
          useValue: {
            experimentalAutoDetectLongPolling: true,
            useFetchStreams: false,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // await fixture.whenStable();
  });

  it('should create user-flight-component', () => {
    expect(component).toBeTruthy();
  });

  it('should call retrieveFlights() and flights is not undefined',  (done) => {
    // let service = TestBed.inject(ABSFirebaseService);
    let spy = spyOn(component, 'retrieveFlights').and.callThrough();
    setTimeout(()=>{
      // component.retrieveFlights();
      component.ngOnInit();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
      expect(component.flights).not.toBe(undefined);
      done();
    }, 1000);
  });

  it('should check if it will display only `Available` flights', (done) => {
    // let service = TestBed.inject(ABSFirebaseService);
    let spy = spyOn(component, 'retrieveFlights').and.callThrough();
    setTimeout(() => {
      component.retrieveFlights();
      fixture.detectChanges();

      const rows: DebugElement[] = fixture.debugElement.queryAll(
        By.css('#userFlightRows')
      );
      expect(rows.length).not.toBeNull;
      expect(spy).toHaveBeenCalled();
      done();
    }, 1000);
  });

  it('should click `Search` flights button and call searchFlights() with empty fields', () => {
    fixture.detectChanges();
    let spy = spyOn(component, 'searchFlights').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#searchFlightBtn')
    ).nativeElement;

    btn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.errorFormInput).toBe('empty fields');
  });

  it('should click `Search` flights button and call searchFlights() with atleast one filled input field', () => {
    component.flightForm.value.origin = 'Tokyo';
    // component.flightForm.value.destination = 'Cebu';

    fixture.detectChanges();
    let spy = spyOn(component, 'searchFlights').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#searchFlightBtn')
    ).nativeElement;

    btn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.errorFormInput).toBe('');
  });

  it('should click `Book Flight` button and call addBookingToUser()', (done) => {
    let spy = spyOn(component, 'addBookingToUser').and.callThrough();
    // let btn:HTMLElement = fixture.debugElement.query(By.css('#bookFlightBtn')).nativeElement;

    setTimeout(() => {
      component.retrieveFlights();
      fixture.detectChanges();
      // console.log(component.flights);
      const btn: HTMLElement = fixture.debugElement.query(
        By.css('#bookFlightBtn')
      ).nativeElement;
      expect(btn).toBeDefined();
      btn.click();
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeTruthy();
      done();
    }, 1000);
  });
});

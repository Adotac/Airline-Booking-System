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

  xit('Should call onClickedUser() when called ', (done) => {
    let spy = spyOn(component, 'onClickedUser').and.callThrough();

    setTimeout(() => {
      fixture.detectChanges();
      // console.log(component.flights);

      component.onClickedUser('AB-02943');
      fixture.detectChanges();

      expect(component.userBooking).toBeDefined();
      expect(spy).toHaveBeenCalled();
      // expect(spy).toBeTruthy();
      done();
    }, 1000);
  });
});

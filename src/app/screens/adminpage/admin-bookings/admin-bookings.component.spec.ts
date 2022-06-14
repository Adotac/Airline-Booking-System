import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

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

  it('Should populate flights when retrieveFlights() is called', () => {
    spyOn(component, 'retrieveFlights');

    component.retrieveFlights();
    expect(component.flights).toBeNull;

    // let firstLabel = fixture.debugElement.query(
    //   By.css('#users-label')
    // ).nativeElement;

    // fixture.detectChanges();

    // expect(firstLabel.textContent).toBe(' Users');
  });

  it('Should call done users when retrieveUsers() is called', () => {
    // expect(component.users).toBeNull();
    setTimeout(() => {
      component.retrieveUsers();
    }, 1000);
    expect(component.done).toHaveBeenCalled;
  });

  it('Should call done users when retrieveFlights() is called', () => {
    spyOn(component, 'retrieveFlights');

    component.retrieveFlights();
    fixture.detectChanges;

    expect(component.retrieveFlight$).not.toBeNull;
    expect(component.flights).toBeNull;
    expect(component.done).toHaveBeenCalled;
  });

  it('Should call done users when done() is called', () => {
    setTimeout(() => {
      component.done();
    }, 1000);
    fixture.detectChanges();
    expect(component.done).toHaveBeenCalled;
  });

  it('Should check if the labels for the "Flights" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#flight-label')
    ).nativeElement;
    fixture.detectChanges();

    expect(firstLabel.textContent).toBe(' Flights');
  });

  it('Should check if the labels for the "Flights" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#flight-label')
    ).nativeElement;
    fixture.detectChanges();

    expect(firstLabel.textContent).toBe(' Flights');
  });

  // it('Should check if the number of labels in user table is equal to 2', () => {
  //   let flightsTable = fixture.debugElement.query(
  //     By.css('#flights-table')
  //   ).nativeElement;
  //   const bannerElement: HTMLElement = fixture.nativeElement;
  //   const p = bannerElement.querySelector('tr')!;
  //   expect(p.cells).toEqual('banner works!');

  //   let tableRows = fixture.debugElement.query(By.css('#flights-table'));
  //   fixture.detectChanges();
  //   expect(tableRows.length).toBe(0);

  //   // expect(flightsTable('tbody tr').count()).toBe(2);
  //   // expect(firstLabel.textContent).toBe(' Flights');
  // });
});

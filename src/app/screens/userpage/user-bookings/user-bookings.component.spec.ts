// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { RouterTestingModule } from '@angular/router/testing';
// import { environment } from 'src/environments/environment';
// import { By } from '@angular/platform-browser';

// import { UserBookingsComponent } from './user-bookings.component';

// describe('UserBookingsComponent', () => {
//   let component: UserBookingsComponent;
//   let fixture: ComponentFixture<UserBookingsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [UserBookingsComponent],
//       imports: [
//         RouterTestingModule,
//         AngularFireModule.initializeApp(environment.firebase),
//         AngularFirestoreModule,
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(UserBookingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create user-booking-component', () => {
//     expect(component).toBeTruthy();
//   });

//   fit('should call retrieveFlights() when retrieveUser() is called and flights is not undefined', (done) => {
//     // let service = TestBed.inject(ABSFirebaseService);
//     let spy = spyOn(component, 'retrieveFlights').and.callThrough();
//     setTimeout(() => {
//       // component.retrieveFlights();
//       component.ngOnInit();
//       fixture.detectChanges();

//       expect(spy).toHaveBeenCalled();
//       expect(component.flights).not.toBe(undefined);
//       done();
//     }, 1000);
//   });

//   fit('should click `Cancel Booking` button and call deleteBookingUser()', (done) => {
//     let spy = spyOn(component, 'deleteBookingUser').and.callThrough();
//     // let btn:HTMLElement = fixture.debugElement.query(By.css('#bookFlightBtn')).nativeElement;

//     setTimeout(() => {
//       // component.retrieveFlights();
//       fixture.detectChanges();
//       // console.log(component.flights);
//       const btn: HTMLElement = fixture.debugElement.query(
//         By.css('#cancelUserFlightBtn')
//       ).nativeElement;
//       expect(btn).toBeDefined();
//       btn.click();
//       expect(spy).toHaveBeenCalled();
//       expect(spy).toBeTruthy();
//       done();
//     }, 1000);
//   });
// });

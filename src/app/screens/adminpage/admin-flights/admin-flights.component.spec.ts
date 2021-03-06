import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Flights } from 'src/app/models/flights.model';
import { UserAccount } from 'src/app/models/user-account.model';
import { AdminFlightsComponent } from './admin-flights.component';
import { By } from '@angular/platform-browser';
import { not } from '@angular/compiler/src/output/output_ast';
// 3 1 7 2

var mockFlights: Flights[] = [
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

describe('AdminFlightsComponent', () => {
  let component: AdminFlightsComponent;
  let fixture: ComponentFixture<AdminFlightsComponent>;

  beforeEach(async () => {
    // component.flightForm.value.origin = 'Cebu, Philippines';
    // component.flightForm.value.departure = 'Tokyo, Japan';
    // component.flightForm.value.departureDate = '06/12/2022';
    // component.flightForm.value.departureTime = '12:00';
    // component.flightForm.value.arivalDate = '06/12/2022';
    // component.flightForm.value.arivalTime = '13:00';

    await TestBed.configureTestingModule({
      declarations: [AdminFlightsComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,

        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return true when form is valid', () => {
    component.flightForm.value.origin = 'Cebu, Philippines';
    component.flightForm.value.destination = 'Tokyo, Japan';

    var result = component['isFormValid']();

    expect(result).toBe(true);
  });

  it('should return false when form is not valid', () => {
    component.flightForm.value.origin = ' ';
    component.flightForm.value.destination = ' ';

    var result = component['isFormValid']();

    expect(result).toBe(false);
  });

  it('should return true when arival and depature dates are valid', () => {
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:00';

    const app = component;
    var result = app['isDateValid']();

    expect(result).toBe(true);
  });

  it('should return false when arival and depature dates are not valid', () => {
    component.flightForm.value.departureDate = '06/12/20222';
    component.flightForm.value.departureTime = '312:00';
    component.flightForm.value.arivalDate = '016/12/2022';
    component.flightForm.value.arivalTime = '113:00';
    2;
    const app = component;
    var result = app['isDateValid']();

    expect(component.errorFormInput).toBe('date or/and time is not valid');
    expect(result).toBe(false);
  });

  it('should return a generated flight code when generateFlightCode is called', () => {
    var result = component.generateFlightCode();
    expect(result).not.toBeNull();
  });

  //partial
  it('should define flights when retrieveFlights method is called', async () => {
    await component.retrieveFlights();
    expect(await component.flights).not.toBeNull();
  });

  // DSIABLE SA NI KAY MAOY GA POPULATE SA FLIGHTS XD
  it('should commit flight data to firebase when setFlightToDB method is called', async () => {
    component.flightForm.value.origin = 'Cebu, Philippines';
    component.flightForm.value.destination = 'Tokyo, Japan';
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:00';

    const app = component;
    await app['setFlightToDB']();

    expect(await component.errorFormInput).toBe('');
  });

  it('should commit flight data to firebase when setFlightToDB method is called', async () => {
    const app = component;
    await app['setFlightToDB']();

    expect(await component.errorFormInput).toBe(
      'arival should be greater than departure '
    );
  });

  it('should return convert date and time arguments to Date newDate when stringToDateTime method is called', () => {
    var result = component.stringToDateTime('06/12/2022', '13:00');

    expect(result).not.toBeNull();
  });

  it('should return convert date and time arguments to Date newDate when stringToDateTime method is called', () => {
    var result = component.stringToDateTime('06/12/2022', '13:00');

    expect(result).not.toBeNull();
  });

  it('should click `submit` flights button and call addFlightBtn() with empty fields', () => {
    let spy = spyOn(component, 'addFlightToDB').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#addFlightBtn')
    ).nativeElement;

    btn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.errorFormInput).toBe('fields should not be empty');
  });

  it('should click `isFormValid` when addFlightBtn() is called', () => {
    let spy = spyOn(component, 'isFormValid').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#addFlightBtn')
    ).nativeElement;

    btn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  it('should click `isDateValid` when addFlightBtn() is called', () => {
    component.flightForm.value.origin = 'Cebu, Philippines';
    component.flightForm.value.departure = 'Tokyo, Japan';
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:00';

    let spy = spyOn(component, 'isDateValid').and.callThrough();
    component.addFlightToDB();
    expect(component.isDateValid()).toBe(true);
  });

  it('should click invalud `isDateValid` when addFlightBtn() is called', () => {
    component.flightForm.value.origin = 'Cebu, Philippines';
    component.flightForm.value.departure = 'Tokyo, Japan';
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:asa00';

    let spy = spyOn(component, 'isDateValid').and.callThrough();
    component.addFlightToDB();
    expect(component.isDateValid()).toBe(false);
  });

  it('should click `submit` cancel flight button and call cancelFlight() with empty fields', () => {
    let spy = spyOn(component, 'cancelFlight').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#cancelFlightBtn')
    ).nativeElement;

    btn.click();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should cancel mock flight data when calling cancelFlight()', () => {
    let spy = spyOn(component, 'cancelFlight').and.callFake(function(c:string){
      if(c == mockFlights[0].flight_code!){
        component.errorCodeInput = '';
        return true;
      }
      component.errorCodeInput = 'flight code not found';
      return false
    });


    component.cancelFlight(mockFlights[0].flight_code!);

    expect(spy).toHaveBeenCalled();
    expect(spy).toBeTruthy();
    expect(component.errorFormInput).toBe('');
  });

  it('Should call mapToObject() and return a value', () => {
    let spy = spyOn(component, 'mapToObject').and.callThrough();
    let value = component.mapToObject(['apples', 500]);
    expect(value).not.toBeNull();
  });

  it('Should call mapToObject() and return a null', () => {
    let spy = spyOn(component, 'mapToObject').and.callThrough();
    let value = component.mapToObject([]);
    expect(value).toEqual(Object.create(null));
  });

  it('Should check if the labels for the "flight list" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#flight-label')
    ).nativeElement;

    expect(firstLabel.textContent).toBe(' Fight List');
  });

  it('Should check if the labels for the "flight list" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#flight-label')
    ).nativeElement;

    expect(firstLabel.textContent).toBe(' Fight List');
  });

  it('Should check if the labels for the "create flight" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#create-label')
    ).nativeElement;

    expect(firstLabel.textContent).toBe(' Create Flight');
  });

  it('Should check if the labels for the "cancel flight" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#cancel-flight-label')
    ).nativeElement;

    expect(firstLabel.textContent).toBe(' Cancel Flight');
  });

  it('Should check if the labels for the "Flight Code" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#flightCode')
    ).nativeElement;

    expect(firstLabel.textContent).toBe('Flight Code');
  });

  it('Should check if the labels for the "Origin" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#origin')
    ).nativeElement;

    expect(firstLabel.textContent).toBe('Origin');
  });
  it('Should check if the labels for the "Destination" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#destination')
    ).nativeElement;

    expect(firstLabel.textContent).toBe('Destination');
  });
  it('Should check if the labels for the "Departure" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#departure')
    ).nativeElement;

    expect(firstLabel.textContent).toBe('Departure');
  });
  it('Should check if the labels for the "date" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#arrival')
    ).nativeElement;

    expect(firstLabel.textContent).toBe('Arrival');
  });
  
  // it(`should list all flights`, () => {
  //   component.flights = [];
  //   fixture.detectChanges();
  
  //   const listLength = 1;
  //   for(let i = 0; i < listLength; i ++) {
  //     component.flights = [{
  //       flight_code: 'IW-82214',
  //       origin_name: 'Cebu',
  //       dest_name: 'Japan',
  //       depart_time: '2:00',
  //       arrival_time: '3:00',
  //       status: 'Available',
  //     }];
  //   }
  //   fixture.detectChanges();
  //   const userEls = fixture.debugElement.queryAll(By.css('adminUserlist'));
  //   expect(userEls.length).toEqual(listLength);
  //   userEls.forEach((userEl, index) => {
  //     const name = userEl.query(By.css('td.code'));
  //     const email = userEl.query(By.css('td.origin'));
  //     const bFlights = userEl.query(By.css('td.dest'));
  //     expect(name).toBeTruthy();
  //     expect(name.nativeElement.innerText).toEqual(component.flights![index].flight_code);
  //     expect(email).toBeTruthy();
  //     expect(email.nativeElement.innerText).toEqual(component.flights![index].origin_name);
  //     expect(bFlights).toBeTruthy();
  //     expect(bFlights.nativeElement.innerText).toEqual(component.flights![index].dest_name);
      
  //   });
  // });
});

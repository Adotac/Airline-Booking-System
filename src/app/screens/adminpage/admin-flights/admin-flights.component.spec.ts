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

import { AdminFlightsComponent } from './admin-flights.component';
import { By } from '@angular/platform-browser';

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

  it('should commit flight data to firebase when setFlightToDB method is called', async () => {
    component.flightForm.value.origin = 'Cebu, Philippines';
    component.flightForm.value.destination = 'Tokyo, Japan';
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:00';

    const app = component;
    await app['setFlightToDB']();

    expect(await component.errorFormInput).not.toBeNull();
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

  it('should click `submit` cancel flight button and call cancelFlight() with empty fields', () => {
    let spy = spyOn(component, 'cancelFlight').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#cancelFlightBtn')
    ).nativeElement;

    btn.click();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.errorFormInput).toBe('');
  });

  it('2should click `submit` cancel flight button and call cancelFlight() with empty fields', () => {
    let spy = spyOn(component, 'cancelFlight').and.callThrough();
    let btn: HTMLElement = fixture.debugElement.query(
      By.css('#cancelFlightBtn')
    ).nativeElement;

    component.cancelFlight('CI-43068');
    btn.click();

    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.errorFormInput).toBe('');
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

  // it('should click `Search` flights button and call searchFlights() with atleast one filled input field', () => {
  //   component.flightForm.value.origin = 'Tokyo';
  //   // component.flightForm.value.destination = 'Cebu';

  //   fixture.detectChanges();
  //   let spy = spyOn(component, 'searchFlights').and.callThrough();
  //   let btn: HTMLElement = fixture.debugElement.query(
  //     By.css('#searchFlightBtn')
  //   ).nativeElement;

  //   btn.click();
  //   fixture.detectChanges();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.errorFormInput).toBe('');
  // });
});

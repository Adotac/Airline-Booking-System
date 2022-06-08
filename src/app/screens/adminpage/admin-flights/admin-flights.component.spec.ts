import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdminFlightsComponent } from './admin-flights.component';

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
});

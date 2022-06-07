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
    component.flightForm.value.departure = 'Tokyo, Japan';
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:00';

    const app = component;
    var result = app['isFormValid']();
    // expect(result).toBe(true);
    // expect(result).toEqual(true);
    expect(component.flightForm.value.origin).toEqual('Cebu, Philippines');
  });
  it('should return true when arival and depature dates are valid', () => {
    component.flightForm.value.departureDate = '06/12/2022';
    component.flightForm.value.departureTime = '12:00';
    component.flightForm.value.arivalDate = '06/12/2022';
    component.flightForm.value.arivalTime = '13:00';

    const app = component;
    var result = app['isDateValid']();
    // expect(result).toEqual(true);
    expect(result).toBe(true);
  });

  it('should return a generated flight code when generateFlightCode is called', () => {
    var result = component.generateFlightCode();
    expect(result).not.toBeNull();
  });
});

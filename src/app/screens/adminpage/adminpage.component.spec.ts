import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';

import { AdminpageComponent } from './adminpage.component';

describe('AdminpageComponent', () => {
  let component: AdminpageComponent;
  let fixture: ComponentFixture<AdminpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminpageComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to go to bookings on click', () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.bookings();
    expect(component.router.navigate).not.toBeNull();
    expect(component.flightsClicked).toBe(false);
    expect(component.bookingClicked).toBe(true);
  });

  it('should be able to go to flights on click', () => {
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    component.flights();
    expect(component.router.navigate).not.toBeNull();
    expect(component.flightsClicked).toBe(true);
    expect(component.bookingClicked).toBe(false);
  });
});

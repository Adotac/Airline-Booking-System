import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SETTINGS as FS_SETTINGS } from '@angular/fire/compat/firestore';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { of } from 'rxjs';
import { UserpageComponent } from './userpage.component';

describe('UserpageComponent', () => {
  let component: UserpageComponent;
  let fixture: ComponentFixture<UserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserpageComponent],

      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        {
          provide: FS_SETTINGS,
          useValue: {
            experimentalAutoDetectLongPolling: true,
            useFetchStreams: false,
          },
        },
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create `userpage-component`', () => {
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

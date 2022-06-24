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
import { AuthService } from './auth.service';

import { Component } from '@angular/core';

describe('AuthService', () => {
  let service: AuthService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
  let component: AuthService;
  let fixture: ComponentFixture<AuthService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
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

    service = TestBed.get(AuthService);
  });

  it('should be created `auth-service`', () => {
    expect(service).toBeTruthy();
  });

  it('should be try to sign in', () => {
    // let spy = spyOn(component, 'SignIn').and.callThrough();
    component.SignIn('a@a.com ', '123123');
    // expect(component.SignIn).toHaveBeenCalled();
    expect(component.userData).not.toBeNull();
  });
});

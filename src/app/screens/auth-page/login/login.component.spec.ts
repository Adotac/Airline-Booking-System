import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreModule,
  SETTINGS as FS_SETTINGS,
} from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,

        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: FS_SETTINGS,
          useValue: {
            experimentalAutoDetectLongPolling: true,
            useFetchStreams: false,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create `Login Component`', () => {
    expect(component).toBeTruthy();
  });

  it('Should check if the title is "Login" exists', () => {
    let firstLabel = fixture.debugElement.query(By.css('#title')).nativeElement;

    expect(firstLabel.textContent).toBe('Login');
  });

  it('should be able to go to register on click', () => {
    let href = fixture.debugElement
      .query(By.css('#a'))
      .nativeElement.getAttribute('href');
    expect(href).toEqual('/register');
  });
});

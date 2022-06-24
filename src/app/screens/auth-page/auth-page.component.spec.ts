import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';

import { AuthPageComponent } from './auth-page.component';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check if the title is the "Ryuku Airlines" exists', () => {
    let firstLabel = fixture.debugElement.query(By.css('#title')).nativeElement;

    expect(firstLabel.textContent).toBe('Ryuku Airlines');
  });

  it('Should check if the subtitle is "" exists', () => {
    let firstLabel = fixture.debugElement.query(
      By.css('#subtitle')
    ).nativeElement;

    expect(firstLabel.textContent).toBe('We go above and beyond');
  });

  it('should set image logo path as expected', () => {
    const ele1 = fixture.debugElement.nativeElement.querySelector('#image');
    expect(ele1['src']).toContain('/assets/aircraft.png');
  });
});
// lesly
// saber
// bane

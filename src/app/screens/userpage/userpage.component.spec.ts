import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserpageComponent } from './userpage.component';

describe('UserpageComponent', () => {
  let component: UserpageComponent;
  let fixture: ComponentFixture<UserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserpageComponent],

      imports: [RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

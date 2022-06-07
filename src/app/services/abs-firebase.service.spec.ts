import { TestBed } from '@angular/core/testing';

import { ABSFirebaseService } from './abs-firebase.service';

describe('ABSFirebaseService', () => {
  let service: ABSFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ABSFirebaseService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});

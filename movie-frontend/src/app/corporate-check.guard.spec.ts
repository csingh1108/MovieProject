import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { corporateCheckGuard } from './corporate-check.guard';

describe('corporateCheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => corporateCheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

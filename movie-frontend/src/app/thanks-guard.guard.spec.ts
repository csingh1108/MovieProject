import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { thanksGuardGuard } from './thanks-guard.guard';

describe('thanksGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => thanksGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

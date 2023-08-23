import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { confirmGuardGuard } from './confirm-guard.guard';

describe('confirmGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confirmGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

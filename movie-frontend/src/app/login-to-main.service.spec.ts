import { TestBed } from '@angular/core/testing';

import { LoginToMainService } from './login-to-main.service';

describe('LoginToMainService', () => {
  let service: LoginToMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginToMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

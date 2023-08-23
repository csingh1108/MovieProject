import { TestBed } from '@angular/core/testing';

import { ConfirmToThanksService } from './confirm-to-thanks.service';

describe('ConfirmToThanksService', () => {
  let service: ConfirmToThanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmToThanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

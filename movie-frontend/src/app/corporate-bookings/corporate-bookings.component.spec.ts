import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateBookingsComponent } from './corporate-bookings.component';

describe('CorporateBookingsComponent', () => {
  let component: CorporateBookingsComponent;
  let fixture: ComponentFixture<CorporateBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateBookingsComponent]
    });
    fixture = TestBed.createComponent(CorporateBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

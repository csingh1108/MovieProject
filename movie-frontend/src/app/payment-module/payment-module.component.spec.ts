import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModuleComponent } from './payment-module.component';

describe('PaymentModuleComponent', () => {
  let component: PaymentModuleComponent;
  let fixture: ComponentFixture<PaymentModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentModuleComponent]
    });
    fixture = TestBed.createComponent(PaymentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

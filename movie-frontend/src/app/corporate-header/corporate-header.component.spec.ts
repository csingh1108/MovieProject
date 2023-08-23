import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateHeaderComponent } from './corporate-header.component';

describe('CorporateHeaderComponent', () => {
  let component: CorporateHeaderComponent;
  let fixture: ComponentFixture<CorporateHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateHeaderComponent]
    });
    fixture = TestBed.createComponent(CorporateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

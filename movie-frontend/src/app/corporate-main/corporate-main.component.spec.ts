import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMainComponent } from './corporate-main.component';

describe('CorporateMainComponent', () => {
  let component: CorporateMainComponent;
  let fixture: ComponentFixture<CorporateMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateMainComponent]
    });
    fixture = TestBed.createComponent(CorporateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

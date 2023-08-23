import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMoviesEditComponent } from './corporate-movies-edit.component';

describe('CorporateMoviesEditComponent', () => {
  let component: CorporateMoviesEditComponent;
  let fixture: ComponentFixture<CorporateMoviesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateMoviesEditComponent]
    });
    fixture = TestBed.createComponent(CorporateMoviesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

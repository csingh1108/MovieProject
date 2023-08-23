import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMoviesComponent } from './corporate-movies.component';

describe('CorporateMoviesComponent', () => {
  let component: CorporateMoviesComponent;
  let fixture: ComponentFixture<CorporateMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateMoviesComponent]
    });
    fixture = TestBed.createComponent(CorporateMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

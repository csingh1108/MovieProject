import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMoviesAddComponent } from './corporate-movies-add.component';

describe('CorporateMoviesAddComponent', () => {
  let component: CorporateMoviesAddComponent;
  let fixture: ComponentFixture<CorporateMoviesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorporateMoviesAddComponent]
    });
    fixture = TestBed.createComponent(CorporateMoviesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

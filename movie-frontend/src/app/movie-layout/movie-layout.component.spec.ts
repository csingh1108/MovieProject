import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieLayoutComponent } from './movie-layout.component';

describe('MovieLayoutComponent', () => {
  let component: MovieLayoutComponent;
  let fixture: ComponentFixture<MovieLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieLayoutComponent]
    });
    fixture = TestBed.createComponent(MovieLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

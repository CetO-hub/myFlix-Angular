import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreComponentComponent } from './genre-component.component';

describe('GenreComponentComponent', () => {
  let component: GenreComponentComponent;
  let fixture: ComponentFixture<GenreComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenreComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

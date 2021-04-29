import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeCoupesDePrincipeComponent} from './liste-coupes-de-principe.component';

describe('ListeCoupesDePrincipeComponent', () => {
  let component: ListeCoupesDePrincipeComponent;
  let fixture: ComponentFixture<ListeCoupesDePrincipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCoupesDePrincipeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCoupesDePrincipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

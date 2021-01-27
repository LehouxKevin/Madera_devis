import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesCommercialesComponent } from './statistiques-commerciales.component';

describe('StatistiquesCommercialesComponent', () => {
  let component: StatistiquesCommercialesComponent;
  let fixture: ComponentFixture<StatistiquesCommercialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesCommercialesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesCommercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

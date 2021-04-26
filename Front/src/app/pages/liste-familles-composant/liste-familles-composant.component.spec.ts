import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFamillesComposantComponent } from './liste-familles-composant.component';

describe('ListeFamillesComposantComponent', () => {
  let component: ListeFamillesComposantComponent;
  let fixture: ComponentFixture<ListeFamillesComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFamillesComposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFamillesComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

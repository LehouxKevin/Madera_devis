import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesRemplissageComponent } from './liste-types-remplissage.component';

describe('ListeTypesRemplissageComponent', () => {
  let component: ListeTypesRemplissageComponent;
  let fixture: ComponentFixture<ListeTypesRemplissageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTypesRemplissageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTypesRemplissageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

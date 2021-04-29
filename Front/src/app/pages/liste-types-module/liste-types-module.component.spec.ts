import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeTypesModuleComponent} from './liste-types-module.component';

describe('ListeTypesModuleComponent', () => {
  let component: ListeTypesModuleComponent;
  let fixture: ComponentFixture<ListeTypesModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTypesModuleComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTypesModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

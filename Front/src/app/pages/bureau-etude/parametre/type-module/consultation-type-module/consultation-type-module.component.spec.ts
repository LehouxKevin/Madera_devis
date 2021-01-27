import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationTypeModuleComponent } from './consultation-type-module.component';

describe('ConsultationTypeModuleComponent', () => {
  let component: ConsultationTypeModuleComponent;
  let fixture: ComponentFixture<ConsultationTypeModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationTypeModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationTypeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

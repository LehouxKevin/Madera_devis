import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationModuleComponent } from './consultation-module.component';

describe('ConsultationModuleComponent', () => {
  let component: ConsultationModuleComponent;
  let fixture: ComponentFixture<ConsultationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

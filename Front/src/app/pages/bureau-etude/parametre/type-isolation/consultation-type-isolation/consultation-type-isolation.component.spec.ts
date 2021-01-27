import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationTypeIsolationComponent } from './consultation-type-isolation.component';

describe('ConsultationTypeIsolationComponent', () => {
  let component: ConsultationTypeIsolationComponent;
  let fixture: ComponentFixture<ConsultationTypeIsolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationTypeIsolationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationTypeIsolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

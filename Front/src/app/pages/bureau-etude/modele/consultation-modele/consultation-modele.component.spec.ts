import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationModeleComponent } from './consultation-modele.component';

describe('ConsultationModeleComponent', () => {
  let component: ConsultationModeleComponent;
  let fixture: ComponentFixture<ConsultationModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

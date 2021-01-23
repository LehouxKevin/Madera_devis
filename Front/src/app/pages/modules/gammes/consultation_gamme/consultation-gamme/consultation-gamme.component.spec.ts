import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationGammeComponent } from './consultation-gamme.component';

describe('ConsultationGammeComponent', () => {
  let component: ConsultationGammeComponent;
  let fixture: ComponentFixture<ConsultationGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationGammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

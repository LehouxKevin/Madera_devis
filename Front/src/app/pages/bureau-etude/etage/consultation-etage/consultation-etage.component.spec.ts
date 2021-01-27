import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationEtageComponent } from './consultation-etage.component';

describe('ConsultationEtageComponent', () => {
  let component: ConsultationEtageComponent;
  let fixture: ComponentFixture<ConsultationEtageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationEtageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationEtageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

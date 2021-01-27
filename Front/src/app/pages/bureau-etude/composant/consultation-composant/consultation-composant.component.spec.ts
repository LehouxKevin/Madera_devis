import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationComposantComponent } from './consultation-composant.component';

describe('ConsultationComposantComponent', () => {
  let component: ConsultationComposantComponent;
  let fixture: ComponentFixture<ConsultationComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationComposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationFamilleComposantComponent } from './consultation-famille-composant.component';

describe('ConsultationFamilleComposantComponent', () => {
  let component: ConsultationFamilleComposantComponent;
  let fixture: ComponentFixture<ConsultationFamilleComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationFamilleComposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationFamilleComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

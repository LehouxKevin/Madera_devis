import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationQualiteHuisserieComponent } from './consultation-qualite-huisserie.component';

describe('ConsultationQualiteHuisserieComponent', () => {
  let component: ConsultationQualiteHuisserieComponent;
  let fixture: ComponentFixture<ConsultationQualiteHuisserieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationQualiteHuisserieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationQualiteHuisserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

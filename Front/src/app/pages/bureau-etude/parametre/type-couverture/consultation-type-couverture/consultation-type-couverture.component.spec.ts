import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationTypeCouvertureComponent } from './consultation-type-couverture.component';

describe('ConsultationTypeCouvertureComponent', () => {
  let component: ConsultationTypeCouvertureComponent;
  let fixture: ComponentFixture<ConsultationTypeCouvertureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationTypeCouvertureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationTypeCouvertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

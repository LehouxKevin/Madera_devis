import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationFinitionExterieurComponent } from './consultation-finition-exterieur.component';

describe('ConsultationFinitionExterieurComponent', () => {
  let component: ConsultationFinitionExterieurComponent;
  let fixture: ComponentFixture<ConsultationFinitionExterieurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationFinitionExterieurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationFinitionExterieurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

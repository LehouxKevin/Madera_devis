import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynchronisationGlobaleComponent } from './synchronisation-globale.component';

describe('SynchronisationGlobaleComponent', () => {
  let component: SynchronisationGlobaleComponent;
  let fixture: ComponentFixture<SynchronisationGlobaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynchronisationGlobaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynchronisationGlobaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

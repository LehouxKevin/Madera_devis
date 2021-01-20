import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoutonDomingoComponent } from './bouton-domingo.component';

describe('BoutonDomingoComponent', () => {
  let component: BoutonDomingoComponent;
  let fixture: ComponentFixture<BoutonDomingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoutonDomingoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoutonDomingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixModeleComponent } from './choix-modele.component';

describe('ChoixModeleComponent', () => {
  let component: ChoixModeleComponent;
  let fixture: ComponentFixture<ChoixModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

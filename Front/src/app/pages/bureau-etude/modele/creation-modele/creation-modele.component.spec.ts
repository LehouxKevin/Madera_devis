import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationModeleComponent } from './creation-modele.component';

describe('CreationModeleComponent', () => {
  let component: CreationModeleComponent;
  let fixture: ComponentFixture<CreationModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationModeleComponent } from './modification-modele.component';

describe('ModificationModeleComponent', () => {
  let component: ModificationModeleComponent;
  let fixture: ComponentFixture<ModificationModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

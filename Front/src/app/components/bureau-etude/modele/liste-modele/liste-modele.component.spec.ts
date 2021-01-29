import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeModeleComponent } from './liste-modele.component';

describe('ListeModeleComponent', () => {
  let component: ListeModeleComponent;
  let fixture: ComponentFixture<ListeModeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeModeleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

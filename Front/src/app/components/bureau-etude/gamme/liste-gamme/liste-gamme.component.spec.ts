import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGammeComponent } from './liste-gamme.component';

describe('ListeGammeComponent', () => {
  let component: ListeGammeComponent;
  let fixture: ComponentFixture<ListeGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

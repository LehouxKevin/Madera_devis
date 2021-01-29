import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGammePageComponent } from './liste-gamme-page.component';

describe('ListeGammePageComponent', () => {
  let component: ListeGammePageComponent;
  let fixture: ComponentFixture<ListeGammePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGammePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGammePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

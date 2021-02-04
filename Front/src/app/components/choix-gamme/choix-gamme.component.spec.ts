import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixGammeComponent } from './choix-gamme.component';

describe('ChoixGammeComponent', () => {
  let component: ChoixGammeComponent;
  let fixture: ComponentFixture<ChoixGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixGammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationGammeComponent } from './creation-gamme.component';

describe('CreationGammeComponent', () => {
  let component: CreationGammeComponent;
  let fixture: ComponentFixture<CreationGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationGammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

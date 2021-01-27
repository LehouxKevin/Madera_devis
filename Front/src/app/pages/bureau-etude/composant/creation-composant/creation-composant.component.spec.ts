import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationComposantComponent } from './creation-composant.component';

describe('CreationComposantComponent', () => {
  let component: CreationComposantComponent;
  let fixture: ComponentFixture<CreationComposantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationComposantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationComposantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

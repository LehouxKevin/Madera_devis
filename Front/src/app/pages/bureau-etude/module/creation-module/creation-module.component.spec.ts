import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationModuleComponent } from './creation-module.component';

describe('CreationModuleComponent', () => {
  let component: CreationModuleComponent;
  let fixture: ComponentFixture<CreationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

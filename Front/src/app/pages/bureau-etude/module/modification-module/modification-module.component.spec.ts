import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationModuleComponent } from './modification-module.component';

describe('ModificationModuleComponent', () => {
  let component: ModificationModuleComponent;
  let fixture: ComponentFixture<ModificationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeModuleComponent } from './liste-module.component';

describe('ListeModuleComponent', () => {
  let component: ListeModuleComponent;
  let fixture: ComponentFixture<ListeModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

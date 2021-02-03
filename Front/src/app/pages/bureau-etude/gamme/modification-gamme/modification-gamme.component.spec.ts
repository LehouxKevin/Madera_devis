import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationGammeComponent } from './modification-gamme.component';

describe('ModificationGammeComponent', () => {
  let component: ModificationGammeComponent;
  let fixture: ComponentFixture<ModificationGammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificationGammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationGammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

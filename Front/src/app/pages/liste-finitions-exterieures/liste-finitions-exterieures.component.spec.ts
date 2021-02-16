import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFinitionsExterieuresComponent } from './liste-finitions-exterieures.component';

describe('ListeFinitionsExterieuresComponent', () => {
  let component: ListeFinitionsExterieuresComponent;
  let fixture: ComponentFixture<ListeFinitionsExterieuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFinitionsExterieuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFinitionsExterieuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

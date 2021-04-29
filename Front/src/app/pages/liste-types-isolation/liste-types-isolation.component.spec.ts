import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeTypesIsolationComponent} from './liste-types-isolation.component';

describe('ListeTypesIsolationComponent', () => {
  let component: ListeTypesIsolationComponent;
  let fixture: ComponentFixture<ListeTypesIsolationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeTypesIsolationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTypesIsolationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

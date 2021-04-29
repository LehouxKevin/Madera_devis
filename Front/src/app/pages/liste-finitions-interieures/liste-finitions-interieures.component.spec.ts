import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeFinitionsInterieuresComponent} from './liste-finitions-interieures.component';

describe('ListeFinitionsInterieuresComponent', () => {
  let component: ListeFinitionsInterieuresComponent;
  let fixture: ComponentFixture<ListeFinitionsInterieuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeFinitionsInterieuresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFinitionsInterieuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

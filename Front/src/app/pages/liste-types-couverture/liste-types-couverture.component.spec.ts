import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypesCouvertureComponent } from './liste-types-couverture.component';

describe('ListeTypesCouvertureComponent', () => {
  let component: ListeTypesCouvertureComponent;
  let fixture: ComponentFixture<ListeTypesCouvertureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTypesCouvertureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTypesCouvertureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

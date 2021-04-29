import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeConceptionOssatureComponent} from './liste-conception-ossature.component';

describe('ListeConceptionOssatureComponent', () => {
  let component: ListeConceptionOssatureComponent;
  let fixture: ComponentFixture<ListeConceptionOssatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeConceptionOssatureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeConceptionOssatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationConceptionOssatureComponent } from './creation-conception-ossature.component';

describe('CreationConceptionOssatureComponent', () => {
  let component: CreationConceptionOssatureComponent;
  let fixture: ComponentFixture<CreationConceptionOssatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationConceptionOssatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationConceptionOssatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

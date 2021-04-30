import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuParametresComponent} from './menu-parametres.component';

describe('MenuParametresComponent', () => {
  let component: MenuParametresComponent;
  let fixture: ComponentFixture<MenuParametresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuParametresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParametresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeQualitesHuisseriesComponent } from './liste-qualites-huisseries.component';

describe('ListeQualitesHuisseriesComponent', () => {
  let component: ListeQualitesHuisseriesComponent;
  let fixture: ComponentFixture<ListeQualitesHuisseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeQualitesHuisseriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeQualitesHuisseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

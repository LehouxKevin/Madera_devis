import { TestBed } from '@angular/core/testing';

import { QualiteHuisseriesService } from './qualite-huisseries.service';

describe('QualiteHuisseriesService', () => {
  let service: QualiteHuisseriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualiteHuisseriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

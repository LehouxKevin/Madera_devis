import { TestBed } from '@angular/core/testing';

import { FamilleComposantService } from './famille-composant.service';

describe('FamilleComposantService', () => {
  let service: FamilleComposantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilleComposantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

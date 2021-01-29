import { TestBed } from '@angular/core/testing';

import { FinitionExterieurService } from './finition-exterieur.service';

describe('FinitionExterieurService', () => {
  let service: FinitionExterieurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinitionExterieurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

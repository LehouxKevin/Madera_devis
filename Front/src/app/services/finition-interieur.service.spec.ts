import { TestBed } from '@angular/core/testing';

import { FinitionInterieurService } from './finition-interieur.service';

describe('FinitionInterieurService', () => {
  let service: FinitionInterieurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinitionInterieurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

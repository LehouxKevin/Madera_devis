import { TestBed } from '@angular/core/testing';

import { CoupeDePrincipeService } from './coupe-de-principe.service';

describe('CoupeDePrincipeService', () => {
  let service: CoupeDePrincipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoupeDePrincipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TypeRemplissageService } from './type-remplissage.service';

describe('TypeRemplissageService', () => {
  let service: TypeRemplissageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeRemplissageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

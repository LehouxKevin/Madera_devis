import { TestBed } from '@angular/core/testing';

import { TypeIsolationService } from './type-isolation.service';

describe('TypeIsolationService', () => {
  let service: TypeIsolationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeIsolationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

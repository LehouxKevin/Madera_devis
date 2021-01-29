import { TestBed } from '@angular/core/testing';

import { TypeCouvertureService } from './type-couverture.service';

describe('TypeCouvertureService', () => {
  let service: TypeCouvertureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCouvertureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

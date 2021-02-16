import { TestBed } from '@angular/core/testing';

import { TypeModuleService } from './type-module.service';

describe('TypeModuleService', () => {
  let service: TypeModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

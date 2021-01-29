import { TestBed } from '@angular/core/testing';

import { ConceptionOssatureService } from './conception-ossature.service';

describe('ConceptionOssatureService', () => {
  let service: ConceptionOssatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptionOssatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CurtureService } from './curture.service';

describe('CurtureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurtureService = TestBed.get(CurtureService);
    expect(service).toBeTruthy();
  });
});

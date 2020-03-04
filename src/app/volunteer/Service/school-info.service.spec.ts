import { TestBed } from '@angular/core/testing';

import { SchoolInfoService } from './school-info.service';

describe('SchoolInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolInfoService = TestBed.get(SchoolInfoService);
    expect(service).toBeTruthy();
  });
});

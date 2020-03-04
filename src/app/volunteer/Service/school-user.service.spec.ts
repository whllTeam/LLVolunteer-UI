import { TestBed } from '@angular/core/testing';

import { SchoolUserService } from './school-user.service';

describe('SchoolUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolUserService = TestBed.get(SchoolUserService);
    expect(service).toBeTruthy();
  });
});

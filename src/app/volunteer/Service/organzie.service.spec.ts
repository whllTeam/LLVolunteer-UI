import { TestBed, inject } from '@angular/core/testing';

import { OrganzieService } from './organzie.service';

describe('OrganzieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganzieService]
    });
  });

  it('should be created', inject([OrganzieService], (service: OrganzieService) => {
    expect(service).toBeTruthy();
  }));
});

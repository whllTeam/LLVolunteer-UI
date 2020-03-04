import { TestBed, inject } from '@angular/core/testing';

import { DormitoryService } from './dormitory.service';

describe('DormitoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DormitoryService]
    });
  });

  it('should be created', inject([DormitoryService], (service: DormitoryService) => {
    expect(service).toBeTruthy();
  }));
});

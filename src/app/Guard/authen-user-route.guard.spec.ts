import { TestBed, async, inject } from '@angular/core/testing';

import { AuthenUserRouteGuard } from './authen-user-route.guard';

describe('AuthenUserRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenUserRouteGuard]
    });
  });

  it('should ...', inject([AuthenUserRouteGuard], (guard: AuthenUserRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});

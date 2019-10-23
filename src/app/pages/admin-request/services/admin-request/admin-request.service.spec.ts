import { TestBed } from '@angular/core/testing';

import { AdminRequestService } from './admin-request.service';

describe('AdminRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminRequestService = TestBed.get(AdminRequestService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ShowUserService } from './show-user.service';

describe('ShowUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowUserService = TestBed.get(ShowUserService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DayoffService } from './dayoff.service';

describe('DayoffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayoffService = TestBed.get(DayoffService);
    expect(service).toBeTruthy();
  });
});

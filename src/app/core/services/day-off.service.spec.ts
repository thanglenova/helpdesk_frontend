import { TestBed } from '@angular/core/testing';

import { DayOffService } from './day-off.service';

describe('DayOffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayOffService = TestBed.get(DayOffService);
    expect(service).toBeTruthy();
  });
});

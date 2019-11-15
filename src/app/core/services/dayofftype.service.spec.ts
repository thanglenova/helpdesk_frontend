import { TestBed } from '@angular/core/testing';

import { DayofftypeService } from './dayofftype.service';

describe('DayofftypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DayofftypeService = TestBed.get(DayofftypeService);
    expect(service).toBeTruthy();
  });
});

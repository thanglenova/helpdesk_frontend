import { TestBed } from '@angular/core/testing';

import { TypeDayOffService } from './type-day-off.service';

describe('TypeDayOffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeDayOffService = TestBed.get(TypeDayOffService);
    expect(service).toBeTruthy();
  });
});

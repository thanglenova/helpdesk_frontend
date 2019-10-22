import { TestBed } from '@angular/core/testing';

import { ShowSkillsService } from './show-skills.service';

describe('ShowSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowSkillsService = TestBed.get(ShowSkillsService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EditSkillsService } from './edit-skills.service';

describe('EditSkillsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditSkillsService = TestBed.get(EditSkillsService);
    expect(service).toBeTruthy();
  });
});

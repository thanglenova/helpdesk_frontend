import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSkillsComponent } from './show-skills.component';

describe('ShowSkillsComponent', () => {
  let component: ShowSkillsComponent;
  let fixture: ComponentFixture<ShowSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

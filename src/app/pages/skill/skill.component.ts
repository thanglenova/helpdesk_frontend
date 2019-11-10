import {Component, OnInit} from '@angular/core';
import {SkillService} from 'src/app/core/services/skill.service';
import {Router} from '@angular/router';
import {Skill} from 'src/app/shared/models/skill';
import {Category} from '../../shared/models/category';
import {CategoryService} from '../../core/services/category.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../../core/services/alert.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  data: Skill[];
  isVisible = false;
  cateValues: Category[];
  isLoading = false;
  edit: boolean;
  id: number;

  editCache: { [key: string]: { edit: boolean; data: Skill } } = {};
  listOfData: Skill[] = [];

  constructor(
    private alertService: AlertService,
    private skillService: SkillService,
    private router: Router,
    private cateService: CategoryService,
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private message: NzMessageService
  ) {
  }

  get f() {
    return this.skillForm.controls;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(skill => skill.id === id)
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(skill => skill.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(data => this.data = data);
  }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
  }

  cancelEdit(id: number) {
    const index = this.data.findIndex(c => c.id === id);
    this.edit = false;
  }

  saveEdit(skill: Skill): void {
    this.skillService.updateSkill(skill).subscribe();
    this.edit = false;
  }

  search(value: number): void {
    if (value == null) {
      this.skillService.getSkills().subscribe(data => this.data = data);
    } else {
      this.skillService.searchSkill(value).subscribe(data => this.data = [...data]);
    }
  }
}

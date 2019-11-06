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
  skills: Skill[];

  skillForm: FormGroup;
  skillEditForm: FormGroup;
  submitted = false;
  categories: Category;
  categoryId: number;

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


  ngOnInit() {
    this.getSkills();
    this.getCategory();

    this.skillForm = this.formBuilder.group({
      name: [Skill, [Validators.required]],
      categories: [Category, [Validators.required]]
    });

    this.skillEditForm = this.formBuilder.group({
      id: [this.id, [Validators.required]],
      name: ['', [Validators.required]],
      categories: [Category, [Validators.required]]
    });
  }

  showModal(): void {
    this.isVisible = true;
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(skills => this.skills = skills);
  }

  getCategory(): void {
    this.cateService.getCategories().subscribe(cateValues => this.cateValues = cateValues);
  }

  onSubmit() {
    this.submitted = true;
    if (this.skillForm.invalid) {
      this.message.warning('Please fill this form');
      return;
    }
    this.skillService.addSkill(this.skillForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('successful');
        },
        error => {
          this.alertService.error('error');
        }
      );
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(currentData: Skill): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this skill?',
      nzContent: '<b style="color: red;">This action can be dangerous</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.data = this.data.filter(c => c !== currentData);
        this.skillService.deleteSkill(currentData).subscribe();
      },
      nzCancelText: 'No'
    });
  }

  startEdit(id: number) {
    console.log(typeof (id));
    this.edit = true;
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

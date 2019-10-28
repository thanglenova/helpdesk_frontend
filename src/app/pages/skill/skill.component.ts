import {Component, OnInit} from '@angular/core';
import {SkillService} from 'src/app/core/services/skill.service';
import {Router} from '@angular/router';
import {Skill} from 'src/app/shared/models/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  data: Skill[];

  editCache: { [key: string]: { edit: boolean; data: Skill } } = {};
  listOfData: Skill[];

  constructor(
    private skillService: SkillService,
    private router: Router,
  ) {
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(skill => skill.id === id);
    this.editCache[id] = {
      data: {...this.listOfData[index]},
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(skill => skill.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: {...item}
      };
    });
  }

  ngOnInit() {
    this.getSkills();
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(data => this.data = data);
  }

}

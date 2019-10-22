import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/core/services/skill.service';
import { Router } from '@angular/router';
import { Skill } from 'src/app/shared/models/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  skills: Skill[];
  skill: Skill;

  editCache: {[key:string]: {edit: boolean; data: Skill}}={};
  listOfData: Skill[] = [];

  constructor(
    private skillService: SkillService,
    private router: Router,
  ) { }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(skill => skill.id===id)
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.listOfData.findIndex(skill => skill.id===id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit() {
    this.getSkills();

    // for (let i = 0; i < 100; i++) {
    //   this.listOfData.push({
    //     id: i,
    //     name: `Edrward ${i}`,
    //     category: {
    //       id: 0,
    //       name: "Cate 1"
    //     }
    //   });
    // }
    // this.updateEditCache();
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(skills=>this.skills=skills);
  }

}

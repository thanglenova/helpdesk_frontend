import { Component, OnInit } from '@angular/core';
import { ShowSkillsService } from '../../service/show-skills/show-skills.service';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/shared/models/skill';

@Component({
  selector: 'app-show-skills',
  templateUrl: './show-skills.component.html',
  styleUrls: ['./show-skills.component.scss']
})
export class ShowSkillsComponent implements OnInit {

  private subscription: Subscription;
  private skills : Skill[];

  constructor(private showSkillService : ShowSkillsService) { }

  ngOnInit() {
    this.subscription = this.showSkillService.getSkillFollowIdUser(4).subscribe(data => {
      this.skills = data;    
    }, error => {
      console.log(error);
    })
  }

}

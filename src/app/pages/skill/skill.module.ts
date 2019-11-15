import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillRoutingModule } from './skill-routing.module';
import { SkillComponent } from './skill.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SkillComponent],
  imports: [CommonModule, SkillRoutingModule, SharedModule],
  exports: [SkillComponent],
})
export class SkillModule { }

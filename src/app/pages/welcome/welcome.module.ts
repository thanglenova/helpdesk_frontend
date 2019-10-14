import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  imports: [CommonModule, SharedModule, WelcomeRoutingModule],
  declarations: [ WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }

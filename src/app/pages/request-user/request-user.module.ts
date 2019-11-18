import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestUserComponent } from './request-user.component';
import { RequestUserRoutingModule } from './request-user-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [RequestUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestUserRoutingModule,
    NzGridModule,
    NzCardModule,
    NzSelectModule,
    NzInputModule,
    NzDatePickerModule,
    NzButtonModule,
    NzMessageModule
  ]
})
export class RequestUserModule { }

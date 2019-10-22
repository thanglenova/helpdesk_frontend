import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatNativeDateModule,FormsModule,NzFormModule,ReactiveFormsModule],
  exports: [

    // Material
    NzInputModule,
    NzDatePickerModule,
    NzFormModule,
    NzTableModule,
    NzGridModule,
    NzButtonModule,
    NzSelectModule
  ]
})
export class AppMaterialModule {}
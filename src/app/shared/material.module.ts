import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {TableModule} from 'primeng/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatNativeDateModule,TableModule,NzTableModule],
  exports: [

    // Material
    NzModalModule,
    TableModule,
    NzInputModule,
    NzDatePickerModule,
    NzFormModule,
    NzTableModule,
    NzGridModule,
    NzButtonModule,
    NzDropDownModule
  ]
})
export class AppMaterialModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './material.module';
import { NzFormModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class SharedModule { }

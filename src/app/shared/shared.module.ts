import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class SharedModule { }

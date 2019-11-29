import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestTypeComponent } from './request-type.component';
import { RequestTypeRoutingModule } from './request-type-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/shared/material.module';

@NgModule({
  declarations: [RequestTypeComponent],
  imports: [
    CommonModule,
    RequestTypeRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    AppMaterialModule
  ],
  exports: [RequestTypeComponent]
})
export class RequestTypeModule {}

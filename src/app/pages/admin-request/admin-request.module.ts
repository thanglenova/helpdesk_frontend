import { NgModule } from '@angular/core';
import { AdminRequestComponent } from './admin-request.component';
import { AdminRequestRoutingModule } from './admin-request-routing.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimeAgoPipe } from 'time-ago-pipe';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AdminRequestComponent,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    AdminRequestRoutingModule
  ],
  exports: [AdminRequestComponent]
})
export class AdminRequestModule { }

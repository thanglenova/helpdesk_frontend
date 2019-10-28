import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RequestRoutingModule} from './request-routing.module';
import {RequestComponent} from './request.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [RequestComponent],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule
  ],
  exports: [RequestComponent]
})
export class RequestModule {
}

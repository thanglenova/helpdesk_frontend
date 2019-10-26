import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { httpInterceptorProviders} from './core/interceptors/index'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertComponent } from './shared/components/alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { NavbarComponent } from './modules/layouts/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { SharedModule } from './shared/shared.module';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AdminRequestComponent } from './pages/admin-request/components/admin-request.component';
import en from '@angular/common/locales/en';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {TimeAgoPipe} from 'time-ago-pipe';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NavbarComponent,
    AdminRequestComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NzFormModule,
    NgZorroAntdModule.forRoot(), 
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    SharedModule,
    IconsProviderModule,
    ReactiveFormsModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ButtonModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: NZ_I18N, useValue: en_US }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

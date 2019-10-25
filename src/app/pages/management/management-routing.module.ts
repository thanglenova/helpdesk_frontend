import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
const routes: Routes = [
    {
        path: '',
        component: ManagementComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ManagementRoutingModule { }

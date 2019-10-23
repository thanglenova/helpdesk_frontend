import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRequestComponent } from './pages/admin-request/components/admin-request.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'categoríe', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)},
  { path: 'skills', loadChildren: () => import('./pages/skill/skill.module').then(m => m.SkillModule)},
  { path: 'admin-request', component: AdminRequestComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

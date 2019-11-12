import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './core/guard/Admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'profile/:id', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'categoríe', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'skills', loadChildren: () => import('./pages/skill/skill.module').then(m => m.SkillModule) },
  { path: 'management', loadChildren: () => import('./pages/management/magement.module').then(m => m.MagementModule) },
  { path: 'admin-request', loadChildren: () => import('./pages/admin-request/admin-request.module').then(m => m.AdminRequestModule)},
  { path: 'request-type', loadChildren: () => import('./pages/request-type/request-type.module').then(m => m.RequestTypeModule), canActivate: [AdminGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

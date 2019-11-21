import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "./core/guard/Admin.guard";
import { AuthGuardService } from "./core/guard/auth-guard.service";
import { NoGuardService } from "./core/guard/no-guard.service";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  {
    path: "user-day-offs",
    loadChildren: () =>
      import("./pages/welcome/welcome.module").then(m => m.WelcomeModule),
    canLoad: [AuthGuardService]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then(m => m.LoginModule),
    canLoad: [NoGuardService]
  },
  {
    path: "admin-dayoffs",
    loadChildren: () =>
      import("./pages/dayoff/dayoff.module").then(m => m.DayoffModule)
  },
  {
    path: "admin-dayofftypes",
    loadChildren: () =>
      import("./pages/dayofftype/dayofftype.module").then(
        m => m.DayofftypeModule
      )
  },
  {
    path: "admin-categoríes",
    loadChildren: () =>
      import("./pages/category/category.module").then(m => m.CategoryModule)
  },
  {
    path: "admin-skills",
    loadChildren: () =>
      import("./pages/skill/skill.module").then(m => m.SkillModule)
  },
  {
    path: "profile/:id",
    loadChildren: () =>
      import("./pages/profile/profile.module").then(m => m.ProfileModule)
  },
  {
    path: "skills",
    loadChildren: () =>
      import("./pages/skill/skill.module").then(m => m.SkillModule),
    canLoad: [AuthGuardService]
  },
  {
    path: "admin-users",
    loadChildren: () =>
      import("./pages/management/magement.module").then(m => m.MagementModule)
  },

  {
    path: "admin-requests",
    loadChildren: () =>
      import("./pages/admin-request/admin-request.module").then(
        m => m.AdminRequestModule
      ),
    canActivate: [AdminGuard]
  },
  {
    path: "request-types",
    loadChildren: () =>
      import("./pages/request-type/request-type.module").then(
        m => m.RequestTypeModule
      ),
    canActivate: [AdminGuard]
  },
  {
    path: "user-requests",
    loadChildren: () =>
      import("./pages/request-user/request-user.module").then(
        m => m.RequestUserModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}

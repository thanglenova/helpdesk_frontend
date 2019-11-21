import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IntrodutionRoutingModule } from "./introdution-routing.module";
import { IntroductionComponent } from "./introduction.component";

@NgModule({
  declarations: [IntroductionComponent],
  imports: [CommonModule, IntrodutionRoutingModule]
})
export class IntrodutionModule {}

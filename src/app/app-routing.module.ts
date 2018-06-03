import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoreComponent } from "./store/store.component";
import { DomComponent } from "./dom_manipulation/dom.component";

const routes: Routes = [
  { path: "", redirectTo: "dom", pathMatch: "full" },
  { path: "store", component: StoreComponent },
  { path: "dom", component: DomComponent }
];
@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

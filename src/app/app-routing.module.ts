import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoreComponent } from "./store/store.component";
import { DomComponent } from "./dom_manipulation/dom.component";
import { SearchBoxComponent } from './search-box/search-box.component';

const routes: Routes = [
  { path: "", redirectTo: "search", pathMatch: "full" },
  { path: "store", component: StoreComponent },
  { path: "dom", component: DomComponent },
  { path: "search", component: SearchBoxComponent }
];
@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

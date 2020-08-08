import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonthsPageComponent} from "./months-page/months-page.component";
import {RegionPageComponent} from "./region-page/region-page.component";

const routes: Routes = [
  { path: '', component: MonthsPageComponent },
  { path: 'region', component: RegionPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

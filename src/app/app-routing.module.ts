import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddComponent } from "./table-page/create-add/create-add.component";
import {MonthsPageComponent} from "./months-page/months-page.component";
import {RegionPageComponent} from "./region-page/region-page.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: MonthsPageComponent },
  { path: 'region', component: RegionPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

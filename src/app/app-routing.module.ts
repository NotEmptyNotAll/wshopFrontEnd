import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MonthsPageComponent} from "./months-page/months-page.component";
import {RegionPageComponent} from "./region-page/region-page.component";
import {OrdersComponent} from "./orders-page/orders.component";

const routes: Routes = [
  { path: 'months', component: MonthsPageComponent },
  { path: '', component: OrdersComponent },
  { path: 'region', component: RegionPageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

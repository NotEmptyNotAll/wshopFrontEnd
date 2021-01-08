import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OrdersComponent} from "./orders-page/orders.component";
import {MasterSelectWindowComponent} from "./master-select-window/master-select-window.component";
import {WorkMasterPageComponent} from "./work-master-page/work-master-page.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'workPage', component: WorkMasterPageComponent },
  { path: 'selectWork', component: MasterSelectWindowComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

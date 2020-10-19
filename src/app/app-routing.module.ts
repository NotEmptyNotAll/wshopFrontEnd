import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OrdersComponent} from "./orders-page/orders.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'order', component: OrdersComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

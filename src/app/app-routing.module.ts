import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddComponent } from "./create-add/create-add.component";
import {TablePageComponent} from "./table-page/table-page.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  { path: '', component: TablePageComponent },
  { path: 'createAddDelete', component: CreateAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

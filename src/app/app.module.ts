import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { CreateAddComponent } from './table-page/create-add/create-add.component';
import { AppRoutingModule } from './app-routing.module';
import { TablePageComponent } from './table-page/table-page.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import {CalendarModule, TabMenuModule} from "primeng";
import {MenubarModule} from 'primeng/menubar';
import { MonthsPageComponent } from './months-page/months-page.component';
import { RegionPageComponent } from './region-page/region-page.component';
import { OrdersComponent } from './orders-page/orders.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import { FilterBoxComponent } from './filter-box/filter-box.component';

@NgModule({
    imports: [
        BrowserModule,
        MultiSelectModule,
        PasswordModule,
        InputTextModule,
        DropdownModule,
        BrowserAnimationsModule,
        MenubarModule,
        TableModule,
        ConfirmDialogModule,
        ButtonModule,
        MessagesModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        TabMenuModule,
        CalendarModule
    ],
    declarations: [AppComponent, CreateAddComponent, TablePageComponent, MonthsPageComponent, RegionPageComponent, OrdersComponent, LoginComponent, FilterBoxComponent],
    bootstrap: [AppComponent],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})

export class AppModule {
}

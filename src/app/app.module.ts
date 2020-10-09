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
import {TabMenuModule} from "primeng";
import {MenubarModule} from 'primeng/menubar';
import { MonthsPageComponent } from './months-page/months-page.component';
import { RegionPageComponent } from './region-page/region-page.component';
import { OrdersComponent } from './orders-page/orders.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MenubarModule,
        TableModule,
        ConfirmDialogModule,
        ButtonModule,
        MessagesModule,
        RouterModule,

        AppRoutingModule,
        FormsModule,
        TabMenuModule
    ],
    declarations: [AppComponent, CreateAddComponent, TablePageComponent, MonthsPageComponent, RegionPageComponent, OrdersComponent],
    bootstrap: [AppComponent],
    providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})

export class AppModule {
}

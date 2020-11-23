import {TransferHttpCacheModule} from '@nguniversal/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CreateAddComponent} from './table-page/create-add/create-add.component';
import {AppRoutingModule} from './app-routing.module';
import {TablePageComponent} from './table-page/table-page.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MessagesModule} from 'primeng/messages';
import {CalendarModule, TabMenuModule} from "primeng";
import {MenubarModule} from 'primeng/menubar';
import {MonthsPageComponent} from './months-page/months-page.component';
import {RegionPageComponent} from './region-page/region-page.component';
import {OrdersComponent} from './orders-page/orders.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {DropdownModule} from 'primeng/dropdown';
import {PasswordModule} from 'primeng/password';
import {MultiSelectModule} from 'primeng/multiselect';
import {InputTextModule} from 'primeng/inputtext';
import {FilterBoxComponent} from './filter-box/filter-box.component';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ListboxModule} from 'primeng/listbox';
import {
    TranslateModule
} from "@ngx-translate/core";
import {NgtUniversalModule} from '@ng-toolkit/universal';
import { DateFilterComponent } from './filters/date-filter/date-filter.component';
import { StateFilterComponent } from './filters/state-filter/state-filter.component';
import { PayedFilterComponent } from './filters/payed-filter/payed-filter.component';
import { SubstringFilterComponent } from './filters/substring-filter/substring-filter.component';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import { PeriodDateFilterComponent } from './filters/period-date-filter/period-date-filter.component';
import * as alasql from 'alasql';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CustomerFilterComponent } from './filters/customer-filter/customer-filter.component';
import { EmployeeFilterComponent } from './filters/employee-filter/employee-filter.component';


// @ts-ignore
// @ts-ignore
@NgModule({
    imports: [
        CommonModule,
        NgtUniversalModule,
        DialogModule,
        TranslateModule.forChild(),
        TransferHttpCacheModule,
        ListboxModule,
        MultiSelectModule,
        PasswordModule,
        SidebarModule,
        InputTextModule,
        RadioButtonModule,
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
        CalendarModule,
        BlockUIModule

    ],

    declarations: [AppComponent,
        CreateAddComponent,
        TablePageComponent,
        MonthsPageComponent,
        RegionPageComponent,
        OrdersComponent,
        LoginComponent,
        FilterBoxComponent,
        MenuBarComponent,
        DateFilterComponent,
        StateFilterComponent,
        PayedFilterComponent,
        SubstringFilterComponent,
        PeriodDateFilterComponent,
        CustomerFilterComponent,
        EmployeeFilterComponent],
    providers: []
})

export class AppModule {
}



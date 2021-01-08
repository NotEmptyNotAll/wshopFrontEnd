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
import {TabMenuModule} from 'primeng/tabmenu';
import {CalendarModule} from 'primeng/calendar';
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
import {FilterBoxComponent} from './widgets/filter-box/filter-box.component';
import {MenuBarComponent} from './menu-bar/menu-bar.component';
import {SidebarModule} from 'primeng/sidebar';
import {ListboxModule} from 'primeng/listbox';
import {
    TranslateModule
} from "@ngx-translate/core";
import {NgtUniversalModule} from '@ng-toolkit/universal';
import { DateFilterComponent } from './widgets/filters/date-filter/date-filter.component';
import { StateFilterComponent } from './widgets/filters/state-filter/state-filter.component';
import { PayedFilterComponent } from './widgets/filters/payed-filter/payed-filter.component';
import { SubstringFilterComponent } from './widgets/filters/substring-filter/substring-filter.component';
import {DialogModule} from 'primeng/dialog';
import {BlockUIModule} from 'primeng/blockui';
import { PeriodDateFilterComponent } from './widgets/filters/period-date-filter/period-date-filter.component';
import * as alasql from 'alasql';
import {RadioButtonModule} from 'primeng/radiobutton';
import { CustomerFilterComponent } from './widgets/filters/customer-filter/customer-filter.component';
import { EmployeeFilterComponent } from './widgets/filters/employee-filter/employee-filter.component';
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService, MessageService } from "primeng/api";
import {RippleModule} from "primeng/ripple";
import { MasterStartWindowComponent } from './master-start-window/master-start-window.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { MasterSelectWindowComponent } from './master-select-window/master-select-window.component';
import {ToastModule} from 'primeng/toast';
import {SplitButtonModule} from 'primeng/splitbutton';
import { DetailFilterComponent } from './widgets/filters/detail-filter/detail-filter.component';
import { ButtonListActionComponent } from './widgets/button-list-action/button-list-action.component';
import {ContextMenuModule} from "primeng/contextmenu";
import { LoadingSpinerComponent } from './widgets/loading-spiner/loading-spiner.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { WorkFilterComponent } from './widgets/filters/work-filter/work-filter.component';
import { WorkStatusFilterComponent } from './widgets/filters/work-status-filter/work-status-filter.component';
import { WorkPeriodFilterComponent } from './widgets/filters/work-period-filter/work-period-filter.component';
import {ProgressBarModule} from "primeng/progressbar";
import { WorkMasterPageComponent } from './work-master-page/work-master-page.component';

// @ts-ignore
// @ts-ignore
@NgModule({
    imports: [
        CommonModule,
        NgtUniversalModule,
        ToastModule,
        DialogModule,
        SplitButtonModule,
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
        AutoCompleteModule,
        ConfirmPopupModule,
        TableModule,
        ConfirmDialogModule,
        ButtonModule,
        MessagesModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        TabMenuModule,
        CalendarModule,
        BlockUIModule,
        RippleModule,
        ContextMenuModule,
        ProgressSpinnerModule,
        ProgressBarModule

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
        EmployeeFilterComponent,
        MasterStartWindowComponent,
        MasterSelectWindowComponent,
        DetailFilterComponent,
        ButtonListActionComponent,
        LoadingSpinerComponent,
        WorkFilterComponent,
        WorkStatusFilterComponent,
        WorkPeriodFilterComponent,
        WorkMasterPageComponent],
    providers: [ConfirmationService, MessageService]
})

export class AppModule {
}



import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {InputMaskModule} from 'primeng/inputmask';

import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { CreateAddComponent } from './create-add/create-add.component';
import { AppRoutingModule } from './app-routing.module';
import { TablePageComponent } from './table-page/table-page.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TableModule,
        ConfirmDialogModule,
        ButtonModule,
        MessagesModule,
        RouterModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [AppComponent, CreateAddComponent, TablePageComponent],
    bootstrap: [AppComponent],
    providers: []
})

export class AppModule {
}

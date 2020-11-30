import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {webSocket} from 'rxjs/webSocket';
import {Order} from "./orders-page/orders";
import { SortEvent } from 'primeng/api';
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import { PrimeNGConfig } from 'primeng/api';
import {ApiDataServiceService} from "./Service/api-data-service.service";

const subject = webSocket("ws://10.102.200.11:4447");

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

    items: MenuItem[];
    activeItem: MenuItem;
    orders: Order[];


    constructor(private primengConfig: PrimeNGConfig,
                private apiService:ApiDataServiceService,
                protected translateService: TranslateService) {
        this.translateService.instant('ua')
    }



    ngOnInit() {
        this.translateService.use(environment.defaultLocale);
        this.items = [
            {label: 'moths', url: '/'},
            {label: 'region', url: '/region'}
        ];
        this.primengConfig.ripple = true;

        this.activeItem = this.items[0];
    }




}

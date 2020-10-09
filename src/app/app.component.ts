import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {webSocket} from 'rxjs/webSocket';
import {Order} from "./orders-page/orders";

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


    constructor(  ) {
    }



    ngOnInit() {
        this.items = [
            {label: 'moths', url: '/'},
            {label: 'region', url: '/region'}
        ];

        this.activeItem = this.items[0];
    }

}

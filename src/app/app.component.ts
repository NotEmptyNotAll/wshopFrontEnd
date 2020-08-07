import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {

    items: MenuItem[];

    constructor() {
    }

    activeItem: MenuItem;

    ngOnInit() {
        this.items = [
            {label: 'moths', url: '/'},
            {label: 'region', url: '/region'}
        ];

        this.activeItem = this.items[0];
    }

}

import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MONTHS} from "../months-page/mock-months";

@Component({
    selector: 'app-months-page',
    templateUrl: './months-page.component.html',
    styleUrls: ['./months-page.component.css']
})
export class MonthsPageComponent implements OnInit {
    data: any[]
    mainColumn: any[]

    constructor() {
    }

    activeItem: MenuItem;

    ngOnInit() {
        this.data = MONTHS
        this.mainColumn = [
            {field: 'id', header: '#', width: '10%'},
            {field: 'name', header: 'month', width: '40%'},
        ]
    }


}

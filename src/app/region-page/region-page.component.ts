import {Component, OnInit} from '@angular/core';
import {REGION} from "./mock-region";

@Component({
    selector: 'app-region-page',
    templateUrl: './region-page.component.html',
    styleUrls: ['./region-page.component.css']
})
export class RegionPageComponent implements OnInit {

    data: any[]=null
    mainColumn: any[]

    constructor() {
    }


    ngOnInit() {
        this.data = REGION
        this.mainColumn = [
            {field: 'id', header: '#', width: '50%'},
            {field: 'name', header: 'region', width: '50%'},
        ];
    }


}

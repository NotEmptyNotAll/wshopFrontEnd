import { Component, OnInit } from '@angular/core';
import {MONTHS} from './mock-months';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
    cols: any[];

    title = 'select months';
    search = ''
    months = []


    constructor() { }

    ngOnInit() {
        this.cols = [
            { field: 'id', header: '#', width: '30%' },
            { field: 'name', header: 'month', width: '30%' },
        ];
    }

    onSearch(search: string): void {
        this.months = MONTHS.filter(item => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
                || item.id.toString().indexOf(search) > -1
        })
        if (this.months.length === 1)
            this.title = 'nice choice';
        else
            this.title = 'select months';

    }


}

import {Component, OnInit} from '@angular/core';
import {MONTHS} from './mock-months';
import {element} from "protractor";


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
    oldText = ''
    inputErr = false
    text = ''
    mainColumn = [
        {field: 'id', header: '#', width: '10%'},
        {field: 'name', header: 'month', width: '40%'},
    ];

    constructor() {
    }

    ngOnInit() {
        this.cols = this.mainColumn.slice()
    }

    setColumn(): void {
        if (this.text.match(/[^0-9,]/) === null) {
            let sizeArr = this.text.split(',');
            if (sizeArr.length < this.cols.length - 2 || (sizeArr.length === 1 && this.cols.length > 2 && sizeArr[0] === '')) {
                this.cols.pop()
            } else {
                sizeArr.forEach((item, index) => {
                    if (item !== '') {
                        if (index >= this.cols.length - 2) {
                            this.cols.push(
                                {field: 'temp'+item, header: item, width: item + '%'},
                            )
                        } else if (this.cols[index + 2].width !== item + '%') {
                            this.cols[index + 2].width = item + '%'
                            this.cols[index + 2].header = item
                        }
                    }
                })
            }
            this.oldText = this.text
            this.inputErr = false
        } else {
            this.inputErr = true
        }
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

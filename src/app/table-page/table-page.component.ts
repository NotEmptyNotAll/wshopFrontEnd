import {Component, OnInit} from '@angular/core';
import {Month} from './month';
import {MonthService} from "../month.service";
import {ConfirmationService} from 'primeng/api';
import {Router} from "@angular/router";
import {CreateAddComponent} from "../create-add/create-add.component";

@Component({
    selector: 'app-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.css'],
    providers: [ConfirmationService, CreateAddComponent]

})
export class TablePageComponent implements OnInit {
    cols: any[];
    title = 'select months';
    months: Month[]
    oldText = ''
    selectRow: Month = {
        id: -1,
        name: ''
    }
    inputErr = false
    text = ''
    mainColumn = [
        {field: 'id', header: '#', width: '10%'},
        {field: 'name', header: 'month', width: '40%'},
    ];


    constructor(private monthService: MonthService,
                private confirmationService: ConfirmationService,
                private _router: Router,
                private createAddComponent: CreateAddComponent) {

    }


    deleteMonth(): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete: ' + this.selectRow.name,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.monthService.deleteMonth(this.selectRow.id)
                this.onSearch()
                this.selectRow = {
                    id: -1,
                    name: ''
                }
            },
            reject: () => {
            }
        });
    }

    changeMonth(): void {
        this.monthService.setChangeRow(this.selectRow)
        this._router.navigate(['/createAddDelete'])
    }

    ngOnInit() {
        this.months = this.monthService.getTempMonth()
        this.cols = this.mainColumn.slice()
        this.setColumn()
    }

    onRowSelect(event): void {
    }

    onRowUnselect(event): void {

    }

    setColumn(): void {
        if (this.monthService.addColumnText.match(/[^0-9,]/) === null) {
            let sizeArr = this.monthService.addColumnText.split(',');
            if (sizeArr.length < this.cols.length - 2 || (sizeArr.length === 1 && this.cols.length > 2 && sizeArr[0] === '')) {
                this.cols.pop()
            } else {
                sizeArr.forEach((item, index) => {
                    if (item !== '') {
                        if (index >= this.cols.length - 2) {
                            this.cols.push(
                                {field: 'temp' + item, header: item, width: item + '%'},
                            )
                        } else if (this.cols[index + 2].width !== item + '%') {
                            this.cols[index + 2].width = item + '%'
                            this.cols[index + 2].header = item
                        }
                    }
                })
            }
            this.oldText = this.monthService.addColumnText
            this.inputErr = false
        } else {
            this.inputErr = true
        }
    }

    onSearch(): void {
        this.months = this.monthService.searchMonth()
        if (this.months.length === 1)
            this.title = 'nice choice';
        else
            this.title = 'select months';
        this.monthService.setTempMonth(this.months)
    }


}


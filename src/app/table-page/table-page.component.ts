import {Component, Input, OnInit} from '@angular/core';
import {TableData} from './tableData';
import {TableDataService} from "./tableData.service";
import {ConfirmationService} from 'primeng/api';
import {Router} from "@angular/router";
import {CreateAddComponent} from "./create-add/create-add.component";
import {Order} from "../orders-page/orders";

@Component({
    selector: 'app-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.css'],
    providers: [ConfirmationService, CreateAddComponent]

})
export class TablePageComponent implements OnInit {
    @Input() startData: TableData[]
    @Input() mainColumn: any[]
    @Input() title: string
    @Input() dynamicColumns : string=''
    cols: any[];
    selectRow: Order = {
        id:  -1 ,
        orderName: '',
        customerId:  null,
        date:  '',
        jobsSum: '',
        componentsSum:  ''
    }
    inputErr = false


    constructor(public tableDataService: TableDataService,
                private confirmationService: ConfirmationService,
                private _router: Router) {


    }


    deleteData(): void {
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete: ' + this.selectRow.orderName,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tableDataService.deleteData(this.selectRow.id)
                this.onSearch()
                this.selectRow = {
                    id:  -1 ,
                    orderName: '',
                    customerId:  null,
                    date:  '',
                    jobsSum: '',
                    componentsSum:  ''
                }
            },
            reject: () => {
            }
        });
    }

    changeData(): void {
        this.tableDataService.setChangeRow(this.selectRow)
        this.tableDataService.showUpdatePage = true
    }

    ngOnInit() {
        this.tableDataService.setStartData(this.startData)
        this.cols = this.mainColumn.slice()
        if (this.dynamicColumns !== '') {
            this.tableDataService.addColumnText=this.dynamicColumns
            this.setColumn()
        }

    }

    setColumn(): void {
        if (this.tableDataService.addColumnText.match(/[^0-9,]/) === null) {
            let sizeArr = this.tableDataService.addColumnText.split(',');
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
            this.inputErr = false
        } else {
            this.inputErr = true
        }
    }

    onSearch(): void {
        this.tableDataService.searchData()
    }


}


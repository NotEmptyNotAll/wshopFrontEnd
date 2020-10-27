import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TableData} from './tableData';
import {TableDataService} from "./tableData.service";
import {ConfirmationService} from 'primeng/api';
import {Router} from "@angular/router";
import {CreateAddComponent} from "./create-add/create-add.component";
import { Table } from 'primeng/table';
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
    selectRow: any={}
    inputErr = false
    columns: any[];
    loading: boolean = false;
    _selectedColumns: any[];



    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter(col => val.includes(col));
    }

    constructor(public tableDataService: TableDataService,
                private confirmationService: ConfirmationService,
                private _router: Router) {
        this.selectRow=this.tableDataService.getTablePatternRow()

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
    onRowSelect(event) {
        this.selectRow=event.data
    }
    changeData(): void {
        this.tableDataService.setChangeRow(this.selectRow)
        this.tableDataService.showUpdatePage = true
    }

    ngOnInit() {
        this.tableDataService.setStartData(this.startData)
        this.cols = this.mainColumn.slice()
        this.columns=this.cols
        this._selectedColumns = this.cols;

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


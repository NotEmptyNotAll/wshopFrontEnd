import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TableData} from './tableData';
import {TableDataService} from "./tableData.service";
import {ConfirmationService, SortEvent} from 'primeng/api';
import {Router} from "@angular/router";
import {CreateAddComponent} from "./create-add/create-add.component";
import {Table} from 'primeng/table';
import {Order} from "../orders-page/orders";
import {TableOrderResponse} from "../Service/table-order-response";
import {OrderService} from "../orders-page/order.service";
import {FilterService} from "../widgets/filters/filter.service";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import { MenuItem, MessageService } from 'primeng/api';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {CustomerFilterComponent} from "../widgets/filters/customer-filter/customer-filter.component";
import {EmployeeFilterComponent} from "../widgets/filters/employee-filter/employee-filter.component";
import {PayedFilterComponent} from "../widgets/filters/payed-filter/payed-filter.component";
import {StateFilterComponent} from "../widgets/filters/state-filter/state-filter.component";
import {PeriodDateFilterComponent} from "../widgets/filters/period-date-filter/period-date-filter.component";
import {DateFilterComponent} from "../widgets/filters/date-filter/date-filter.component";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.css'],
    providers: [ConfirmationService, CreateAddComponent]

})
export class TablePageComponent implements OnInit {
    selectedProduct: any[];
    @ViewChild(CustomerFilterComponent) childCustomerFilter:CustomerFilterComponent
    @ViewChild(EmployeeFilterComponent) childEmployeeFilter:EmployeeFilterComponent
    @ViewChild(PayedFilterComponent) childPayedFilter:PayedFilterComponent
    @ViewChild(StateFilterComponent) childStateFilter:StateFilterComponent
    @ViewChild(DateFilterComponent) childDateFilter:DateFilterComponent
    @ViewChild(PeriodDateFilterComponent) childPeriodDateFilter:PeriodDateFilterComponent
    @Input() startData: TableData[]
    @Input() mainColumn: any[]
    @Input() stateFilterDisable:boolean=false
    @Input() buttonActionDisable:boolean=false
    @Input() standardFilterDisable:boolean=false
    @Input() title: string
    @Input() dynamicColumns: string = ''
    @Input() buttonItems: MenuItem[]
    cols: any[];
    selectRow: any = {}
    inputErr = false
    data: TableOrderResponse
    columns: any[];
    loading: boolean = false;
    items: MenuItem[]=[
        {label: 'action', icon: 'pi pi-fw pi-search'},
        {label: 'action', icon: 'pi pi-fw pi-times'}
    ];

    _selectedColumns: any[];
    ordersResponse = null
    contextItems:MenuItem[]=[
        {label: 'View', icon: 'pi pi-fw pi-search'},
            {label: 'Delete', icon: 'pi pi-fw pi-times'}
        ];
    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    downloadExel() {
        console.log(this.tableDataService.mainData)
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableDataService.mainData);
        let wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, worksheet, 'blank')
        XLSX.writeFile(wb, 'exmp' + '.xlsx') // name of the file is 'book.xlsx'

    }

    confirm(event,rowData) {
        console.log(rowData)
        this.confirmationService.confirm({
            target: event.target,
            message: rowData.Comment,
            icon: 'pi pi-exclamation-triangle',
            rejectVisible:false,
            accept: () => {
                //confirm action
            },
            reject: () => {
                //reject action
            }
        });
    }
    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        // this._selectedColumns = this.cols.filter(col => val.includes(col));
    }
    cancelFilter(){
        this.filterService.clearFilter()
        this.childCustomerFilter.clear()
        this.childEmployeeFilter.clear()
        this.childPayedFilter.clear()
        this.childStateFilter.clear()
        this.childDateFilter.clear()
       // this.childPeriodDateFilter.clear()
    }
    async updateData() {
        this.data = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', this.filterService.getOrderRequest()
        );
        this.display=false

        let mainColumn = []
        this.data.columnTables.map(elem => {
            mainColumn.push(
                {
                    field: elem.nameColumn,
                    header: elem.nameColumn,
                    width: elem.width<100?elem.width+elem.nameColumn.length*8:elem.width+elem.nameColumn.length*5
                }
            )
        })
        let regexp = new RegExp('^[1-9]\d{0,2}$');
        let tableBody = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellData.indexOf('thWOrders.orderClosed') !== -1) {
                    tableRow[cell.cellName] = cell.cellData.substr(22, 3)
                } else if (cell.cellName === 'Код' || cell.cellName === 'Борг' || cell.cellName === 'Разом'
                    || cell.cellName === 'З/ч' || cell.cellName === 'Роб.') {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if ((cell.cellName.toLowerCase().indexOf('до') !== -1 || cell.cellName.toLowerCase().indexOf('дата') !== -1 || cell.cellName === '---') && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = data.getDate() + '.' + data.getMonth() + '.' + data.getFullYear();
                } else {
                    tableRow[cell.cellName] = cell.cellData
                }
            })
            tableBody.push(tableRow)
        })
        let tableRowPattern: any = {}

        console.log(this.data)
        if (this.data.ordersTableBody.length !== 0) {
            this.data.ordersTableBody[0].rowData.map(
                cell => {
                    if (cell.cellName === 'Close') {
                        tableRowPattern[cell.cellName] = cell.cellData.substr(22, 3)

                    } else {
                        tableRowPattern[cell.cellName] = cell.cellData;
                    }
                }
            )
        }


        this.tableDataService.setMainData(tableBody)
        this.tableDataService.setTablePatternRow(tableRowPattern)

        this.tableDataService.setStartData(this.startData)
        this.cols = this.mainColumn.slice()
        this.columns = this.cols
        this._selectedColumns = this.cols;

        if (this.dynamicColumns !== '') {
            this.tableDataService.addColumnText = this.dynamicColumns
            this.setColumn()
        }
    }

    constructor(public tableDataService: TableDataService,
                public orderService: OrderService,
                public filterService: FilterService,
                public apiService: ApiDataServiceService,
                private confirmationService: ConfirmationService,
                private _router: Router) {
        this.selectRow = this.tableDataService.getTablePatternRow()

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
                    id: -1,
                    orderName: '',
                    customerId: null,
                    date: '',
                    jobsSum: '',
                    componentsSum: ''
                }
            },
            reject: () => {
            }
        });
    }

    onRowSelect(event) {
        this.selectRow = event.data
    }

    changeData(): void {
        this.tableDataService.setChangeRow(this.selectRow)
        this.tableDataService.showUpdatePage = true
    }

    ngOnInit() {
        this.tableDataService.setStartData(this.startData)
        this.cols = this.mainColumn.slice()
        this.columns = this.cols
        this._selectedColumns = this.cols;

        console.log(this.columns)
        if (this.dynamicColumns !== '') {
            this.tableDataService.addColumnText = this.dynamicColumns
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
                                {field: 'temp' + item, header: item, width: item },
                            )
                        } else if (this.cols[index + 2].width !== item ) {
                            this.cols[index + 2].width = item
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


    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (value1.length > 3)
                result = value1.localeCompare(value2)
            else if (value1.length > 2 && value2.length < 3)
                result = 1;
            else if (value2.length > 2 && value1.length < 3)
                result = -1
            else if (value2.length > 3 && value1.length > 3)
                result = value1.localeCompare(value2)

            return result;
        });
    }

}


import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren} from '@angular/core';
import {TableData} from './tableData';
import {TableDataService} from "./tableData.service";
import {ConfirmationService, LazyLoadEvent, SortEvent} from 'primeng/api';
import {Router} from "@angular/router";
import {CreateAddComponent} from "./create-add/create-add.component";
import {Table} from 'primeng/table';
import {Order} from "../orders-page/orders";
import {TableOrderResponse} from "../Service/table-order-response";
import {OrderService} from "../orders-page/order.service";
import {FilterService} from "../widgets/filters/filter.service";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {MenuItem, MessageService} from 'primeng/api';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {CustomerFilterComponent} from "../widgets/filters/customer-filter/customer-filter.component";
import {EmployeeFilterComponent} from "../widgets/filters/employee-filter/employee-filter.component";
import {PayedFilterComponent} from "../widgets/filters/payed-filter/payed-filter.component";
import {StateFilterComponent} from "../widgets/filters/state-filter/state-filter.component";
import {PeriodDateFilterComponent} from "../widgets/filters/period-date-filter/period-date-filter.component";
import {DateFilterComponent} from "../widgets/filters/date-filter/date-filter.component";
import * as moment from "moment";
import {SubstringFilterComponent} from "../widgets/filters/substring-filter/substring-filter.component";
import {ServStateFilterService} from "../widgets/filters/state-filter/serv-state-filter.service";
import {ServPeriodFilterService} from "../widgets/filters/period-date-filter/serv-period-filter.service";
import {ServSubstringFilterService} from "../widgets/filters/substring-filter/serv-substring-filter.service";
import {stringify} from "querystring";
import {User} from "../Service/User";
import {AppNavigateService} from "../Service/app-navigate.service";
import { HostListener } from "@angular/core";
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'app-table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.scss'],
    providers: [ConfirmationService, CreateAddComponent]

})
export class TablePageComponent implements OnInit {
    selectedProduct: any[];
    @ViewChild(CustomerFilterComponent) childCustomerFilter: CustomerFilterComponent
    @ViewChild(EmployeeFilterComponent) childEmployeeFilter: EmployeeFilterComponent
    @ViewChild(PayedFilterComponent) childPayedFilter: PayedFilterComponent
    @ViewChild(StateFilterComponent) childStateFilter: StateFilterComponent
    @ViewChild(DateFilterComponent) childDateFilter: DateFilterComponent
    @ViewChild(SubstringFilterComponent) subStringFilter: DateFilterComponent
    @ViewChild(PeriodDateFilterComponent) childPeriodDateFilter: PeriodDateFilterComponent
    @Input() startData: TableData[]
    @Output() onUpdateData: EventEmitter<any> = new EventEmitter();
    @Output() onLazyLoad: EventEmitter<any> = new EventEmitter();
    @Output() contextMenuActionUpdateData: EventEmitter<any> = new EventEmitter();
    @Input() mainColumn: any[]
    @Input() stateFilterDisable: boolean = false
    @Input() hideButtonBar: boolean = false
    @Input() contextMenuActionDisable: boolean = false
    @Input() masterWindowsSelectDisable: boolean = false
    @Input() standardFilterDisable: boolean = false
    @Input() title: string
    @Input() dynamicColumns: string = ''
    @Input() buttonItems: MenuItem[]
    @Input() confirmDisplay: boolean = false;
    @Input() confirmDialog: boolean = false;
    lazyLoadFix: boolean = true
    cols: any[];
    contextSelectItem: any = {}
    selectRow: any = {}
    inputErr = false
    data: TableOrderResponse
    columns: any[];
    loading: boolean = false;

    items: MenuItem[] = []
    _selectedColumns: any[];
    ordersResponse = null
    contextItems: MenuItem[] = [
        {label: 'View', icon: 'pi pi-fw pi-search'},
        {label: 'Delete', icon: 'pi pi-fw pi-times'}
    ];
    screenHeight:number=1920
    screenWidth:number=1080
    display: boolean = false;

    confirmOnFilter(event) {
        if ((this.serviceStateFiler.disableFastFiled || this.filterPeriodService.disableFastFiled) && this.confirmDialog) {
            this.confirmationService.confirm({
                target: event.target,
                // message: 'стандартнi фiльтри будуть очищені. Продовжити?',
                message: 'стандартные фильтры будут очищены. Продолжить?',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'да',
                rejectLabel: 'нет',
                accept: () => {
                    this.cancelFilter();
                    this.serviceStateFiler.onFastFilter()
                    this.filterPeriodService.onFastFilter()
                    this.serviceSubstring.onFastFilter()
                    this.confirmDisplay = false
                    this.updateData()
                },
                reject: () => {
                    this.confirmDisplay = false
                }
            });
        }

    }


    showDialog() {
        this.display = true;
        this.serviceStateFiler.onStndFilter()
        this.filterPeriodService.onStndFilter()
        this.serviceSubstring.onStndFilter()
    }

    downloadExel() {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.tableDataService.mainData);
        let wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, worksheet, 'blank')
        XLSX.writeFile(wb, 'замовлення' + '.xlsx') // name of the file is 'book.xlsx'

    }

    confirm(event, rowData) {
        if (this.confirmDisplay) {
            this.confirmDisplay = false
        } else {
            this.confirmDisplay = true
        }
        this.confirmationService.confirm({
            target: event.target,
            message: rowData.Comment,
            icon: 'pi pi-exclamation-triangle',
            rejectVisible: false,
            acceptVisible: false,
            acceptLabel: 'да',
            accept: () => {
                this.confirmDisplay = false
            },
            reject: () => {
                this.confirmDisplay = false
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

    cancelFilter() {
        this.filterService.clearFilter()
        this.childCustomerFilter.clear()
        this.childEmployeeFilter.clear()
        this.childPayedFilter.clear()
        this.childStateFilter.clear()
        this.childDateFilter.clear()
    }

    async updateData() {
        this.display = false
        this.onUpdateData.emit()
        if (this.dynamicColumns !== '') {
            this.tableDataService.addColumnText = this.dynamicColumns
            this.setColumn()
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;

    }

    constructor(public tableDataService: TableDataService,
                public orderService: OrderService,
                public filterService: FilterService,
                private router: Router,
                private appNavigate: AppNavigateService,
                public filterPeriodService: ServPeriodFilterService,
                public apiService: ApiDataServiceService,
                public serviceSubstring: ServSubstringFilterService,
                public serviceStateFiler: ServStateFilterService,
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

    chooseColumn() {
        let tempArr = [];
        this.columns.forEach(elem => {
            let temp = this._selectedColumns.find(e => {
                return e.field === elem.field
            })
            if (temp !== undefined) {
                tempArr.push(elem)
            }
        })
        this._selectedColumns = tempArr
    }


    changeData(): void {
        this.tableDataService.setChangeRow(this.selectRow)
        this.tableDataService.showUpdatePage = true
    }


    updateContextMenu() {

        if (this.contextMenuActionDisable) {
            if (this.masterWindowsSelectDisable) {
                this.items = [{
                    label: 'завершить', icon: 'pi pi-fw pi-times',
                    command: () => {
                        // this.contextActionEnd(this.contextSelectItem['ID работы'])
                    }
                },
                    {label: 'пауза', icon: 'pi pi-fw pi-pause'}]
            } else {
                this.items = [{
                    label: 'начать', icon: 'pi pi-fw pi-play',
                    command: () => {
                        // this.contextAction(this.contextSelectItem['ID работы'])
                    }
                }]
            }
        }
    }

    ngOnInit() {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        this.updateContextMenu()
        this.tableDataService.setStartData(this.startData)
        this.cols = this.mainColumn.slice()
        this.columns = this.cols
        this._selectedColumns = this.cols;
        this.display = false

        if (this.dynamicColumns !== '') {
            this.tableDataService.addColumnText = this.dynamicColumns
            this.setColumn()
        }

    }

    async contextAction(userId: number, status: string) {
        let data = await this.apiService.post<TableOrderResponse>(
            'startWork', {
                id: userId, data: status,
                date: moment().utc().format("YYYY-MM-DD"),
                user: this.apiService.getUserData()
            }, false,true
        );

        if (data.status !== -1) {
            // this.orderService.setOrderResponse(data)
            // this.orderService.dataIsExist = true
            this.appNavigate.toListOfWork()
        } else {
            this.apiService.normalizeError('работа уже была начата')
        }

        // this.router.navigate(['/workPage']);
        // this.contextMenuActionUpdateData.emit()
    }

    async contextActionEnd(userId: number) {
        let data = await this.apiService.post<TableOrderResponse>(
            'endWork', {
                id: userId, data: '',
                date: moment().utc().format("YYYY-MM-DD"),
                user: this.apiService.getUserData()
            }, false,true
        );

        this.tableDataService.setMainData(this.tableDataService.mainData.filter((elem)=>elem['ID работы']!==userId))
        if (this.tableDataService.mainData.length === 0) {
            this.appNavigate.toSelectWork();
        }

        // this.orderService.setOrderResponse(data)
        // let reqst = this.filterService.getOrderRequest()
        // reqst.workStatus = 2
        // this.filterService.setOrderRequest(reqst)
        // this.onUpdateData.emit()

        // this.onUpdateData.emit()
        // this.contextMenuActionUpdateData.emit()
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
                                {field: 'temp' + item, header: item, width: item},
                            )
                        } else if (this.cols[index + 2].width !== item) {
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
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }

    async loadDataLazy(event: LazyLoadEvent) {


        // let loadedCars = this.cars.slice(event.first, (event.first + event.rows));
        //
        // //populate page of virtual cars
        // Array.prototype.splice.apply(this.virtualCars, [...[event.first, event.rows], ...loadedCars]);
        //
        // //trigger change detection
        // this.tableDataService.mainData = [...this.tableDataService.mainData];

        // alert(event.first + ' ' + event.rows);
        // if (this.apiService.sizeNextRequest>0  ) {
        //     // let loadedCars = this.tableDataService.mainData.slice(event.first, (event.first + event.rows));
        //     // Array.prototype.splice.apply( this.tableDataService.mainData, [...[event.first, event.rows], ...loadedCars]);
        //
        //     this.onLazyLoad.emit()
        // }
    }
}


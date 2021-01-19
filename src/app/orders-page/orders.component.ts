import {WINDOW} from '@ng-toolkit/universal';
import {Component, OnInit, Renderer2, Inject} from '@angular/core';
import {REGION} from "../region-page/mock-region";
import {Order} from "./orders";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {TableDataService} from "../table-page/tableData.service";
import {OrderService} from "./order.service";
import {Router} from '@angular/router';
import {TableOrderResponse} from "../Service/table-order-response";
import {User} from "../Service/User";
import * as moment from "moment";
import {FilterService} from "../widgets/filters/filter.service";
import {ServStateFilterService} from "../widgets/filters/state-filter/serv-state-filter.service";
import {ServPeriodFilterService} from "../widgets/filters/period-date-filter/serv-period-filter.service";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
    data: TableOrderResponse
    mainColumn: any[]
    listener1;
    listener2;
    listener3;
    sec: number
    secIncr: number = 1
    temp: any;
    twoDownloadLoad: boolean = false
    private user: User;
    private enableLoading:boolean=true

    private intervalUpdate: any
    secUpdate: number = 0

    constructor(@Inject(WINDOW) private window: Window,
                public apiService: ApiDataServiceService,
                public tableService: TableDataService,
                public orderService: OrderService,
                public renderer2: Renderer2,
                public stateFilterService: ServStateFilterService,
                public periodFilterService: ServPeriodFilterService,
                public filterService: FilterService,
                public tableDataService: TableDataService,
                private router: Router) {
        this.start()

        this.listener1 = this.renderer2.listen('window', 'scroll', (e) => {
            this.sec = 0
        });

        this.listener2 = this.renderer2.listen('window', 'click', (e) => {
            this.sec = 0
        });


        this.listener3 = this.renderer2.listen('window', 'mousemove', (e) => {
            this.sec = 0
        });
        if (orderService.getUserValidate()) {
            this.getOrd()
        } else {
            this.router.navigate(['/'])
        }
    }

    start() {


        this.sec = 0
        setInterval(() => {
            this.sec++
            if (this.sec == 1500) {
                this.stateFilterService.defaultFastFilter()
                this.periodFilterService.defaultFastFilter()
                this.router.navigate(['/'])
            }
        }, 1000);
    }


    tick(sec: number) {

        sec++;
        if (sec == 10) {
            this.user = null
            this.apiService.setUserData(this.user)
            this.orderService.setUserValidate(false)
            this.router.navigate(['/'])
        }
    }

    async getOrd() {
        this.data = this.orderService.getOrderResponse()
        // this.data = await this.apiService.get<Order[]>('getCroppedOrders')
        // this.data = this.orderService.getOrderResponse()
        if (this.data.status !== -1) {
            this.mainColumn = []
            this.apiService.startIndex = 0;
            this.data.columnTables.map(elem => {
                this.mainColumn.push(
                    {
                        field: elem.nameColumn,
                        header: elem.nameColumn,
                        width: elem.width < 100 ? elem.width + elem.nameColumn.length * 8 : elem.width + elem.nameColumn.length * 5
                    }
                )
            })
            this.apiService.startIndex += this.apiService.sizeDataResponse

            let tableBody = []
            this.data.ordersTableBody.map(row => {
                let tableRow: any = {}
                row.rowData.map(cell => {
                    if (cell.cellData.indexOf('thWOrders.orderClosed') !== -1) {
                        tableRow[cell.cellName] = cell.cellData.substr(22, 3)
                    } else if (cell.cellName === 'Код' || cell.cellName === 'Долг' || cell.cellName === 'Всего'
                        || cell.cellName === 'З/ч' || cell.cellName === 'Раб.') {
                        tableRow[cell.cellName] = Number(cell.cellData)
                    } else if ((cell.cellName.toLowerCase().indexOf('до') !== -1 || cell.cellName.toLowerCase().indexOf('дата') !== -1 || cell.cellName === '---') && !isNaN(new Date(cell.cellData).getDate())) {
                        let data = new Date(cell.cellData)
                        tableRow[cell.cellName] = moment(data.getTime()).utc().format("YYYY-MM-DD");
                    } else {
                        tableRow[cell.cellName] = cell.cellData
                    }
                })
                tableBody.push(tableRow)
            })
            let tableRowPattern: any = {}

            this.data.ordersTableBody[0].rowData.map(
                cell => {
                    if (cell.cellName === 'Close') {
                        tableRowPattern[cell.cellName] = cell.cellData.substr(22, 3)

                    } else {
                        tableRowPattern[cell.cellName] = cell.cellData;
                    }
                }
            )
            this.tableService.setMainData(tableBody)
            this.tableService.setTablePatternRow(tableRowPattern)
        } else {
            this.apiService.normalizeError('Произашла ошибка. Неправильный пароль')

        }
    }


    async twoDownload() {
        let request = this.filterService.getOrderRequest()
        request.sizeResponse = this.data.sizeTwoPartData
        request.rowStartIndex = this.apiService.startIndex
        this.filterService.setOrderRequest(request)
        this.data = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', this.filterService.getOrderRequest(), false
        ,true);
        let tableBody = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellData.indexOf('thWOrders.orderClosed') !== -1) {
                    tableRow[cell.cellName] = cell.cellData.substr(22, 3)
                } else if (cell.cellName === 'Код' || cell.cellName === 'Долг' || cell.cellName === 'Всего'
                    || cell.cellName === 'З/ч' || cell.cellName === 'Раб.') {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if ((cell.cellName.toLowerCase().indexOf('до') !== -1 || cell.cellName.toLowerCase().indexOf('дата') !== -1 || cell.cellName === '---') && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = moment(data.getTime()).utc().format("YYYY-MM-DD");
                } else {
                    tableRow[cell.cellName] = cell.cellData
                }
            })
            tableBody.push(tableRow)
        })
        // this.tableDataService.mainData=this.tableDataService.mainData.slice(0,this.tableDataService.mainData.length-this.apiService.sizeNextRequest)
        this.tableDataService.mainData = Array.prototype
            .concat(this.tableDataService.mainData,
                tableBody)
        alert(this.tableDataService.mainData.length)


    }

    async updateData() {
        this.secUpdate=0
        this.apiService.startIndex = 0;
        let request = this.filterService.getOrderRequest()
        request.sizeResponse = 50
        request.rowStartIndex = 0
        this.filterService.setOrderRequest(request)
        this.apiService.applySubLoading=true
        this.data = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', this.filterService.getOrderRequest(), false
        ,this.enableLoading);
        this.enableLoading=true
        this.apiService.startIndex += this.apiService.sizeDataResponse
        this.apiService.sizeNextRequest = this.data.sizeTwoPartData
        // this.tableDataService.mainData = []

        let tabData = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellData.indexOf('thWOrders.orderClosed') !== -1) {
                    tableRow[cell.cellName] = cell.cellData.substr(22, 3)
                } else if (cell.cellName === 'Код' || cell.cellName === 'Долг' || cell.cellName === 'Всего'
                    || cell.cellName === 'З/ч' || cell.cellName === 'Раб.') {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if ((cell.cellName.toLowerCase().indexOf('до') !== -1 || cell.cellName.toLowerCase().indexOf('дата') !== -1 || cell.cellName === '---') && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = moment(data.getTime()).utc().format("YYYY-MM-DD");
                } else {
                    tableRow[cell.cellName] = cell.cellData
                }
            })
            tabData.push(tableRow)
            // this.tableDataService.mainData.push(tableRow)
        })


        //     if(this.data.sizeTwoPartData >0){
        //     this.tableDataService.mainData = Array.prototype
        //         .concat(this.tableDataService.mainData,
        //             Array.from({length: this.data.sizeTwoPartData > 50 ? 50 : this.data.sizeTwoPartData}))
        // }
        if (this.data.sizeTwoPartData > 0) {
            // this.tableDataService.mainData = Array.prototype.concat(tabData,
            //     Array.from({length: this.data.sizeTwoPartData}))
            this.twoDownload()
        }
        this.tableDataService.setMainData(tabData)
        this.apiService.isLoadingData = false

        // let tableRowPattern: any = {}

        // if (this.data.ordersTableBody.length !== 0) {
        //     this.data.ordersTableBody[0].rowData.map(
        //         cell => {
        //             if (cell.cellName === 'Close') {
        //                 tableRowPattern[cell.cellName] = cell.cellData.substr(22, 3)
        //
        //             } else {
        //                 tableRowPattern[cell.cellName] = cell.cellData;
        //             }
        //         }
        //     )
        // }


        //this.tableDataService.setTablePatternRow(tableRowPattern)

        this.tableDataService.setStartData(this.data)
        return true;
    }

    ngOnInit() {
        this.updateInfoOnSite()
    }


    updateInfoOnSite() {
        this.intervalUpdate = setInterval(() => {
            this.secUpdate++
            if (this.secUpdate === 5) {
                this.enableLoading=false
                this.apiService.applySubLoading = false
                this.updateData()
            }
        }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalUpdate);
    }

}

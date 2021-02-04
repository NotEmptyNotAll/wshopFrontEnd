import {Component, OnInit, Renderer2} from '@angular/core';
import {TableOrderResponse} from "../Service/table-order-response";
import {MenuItem} from "primeng/api";
import {User} from "../Service/User";
import {OrderRequest} from "../widgets/filters/order.request";
import {TableDataService} from "../table-page/tableData.service";
import {OrderService} from "../orders-page/order.service";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {FilterService} from "../widgets/filters/filter.service";
import {Router} from "@angular/router";
import * as moment from "moment";
import {AppNavigateService} from "../Service/app-navigate.service";
import {CellType} from "../table-page/CellType";

@Component({
    selector: 'app-work-master-page',
    templateUrl: './work-master-page.component.html',
    styleUrls: ['./work-master-page.component.css']
})
export class WorkMasterPageComponent implements OnInit {

    data: TableOrderResponse
    mainColumn: any[]
    listener1;
    listener2;
    listener3;
    sec: number
    secIncr: number = 1
    temp: any;
    buttItem: MenuItem[];
    private user: User;
    private enableLoading: boolean = true
    private orderRequest: OrderRequest

    constructor(public tableService: TableDataService,
                public orderService: OrderService,
                public renderer2: Renderer2,
                public tableDataService: TableDataService,
                private appNavigate: AppNavigateService,
                public apiService: ApiDataServiceService,
                public filterService: FilterService,
                private router: Router) {

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

    ngOnInit(): void {
        this.buttItem = [
            {
                label: 'Update', icon: 'pi pi-refresh', command: () => {
                }
            },
            {
                label: 'Delete', icon: 'pi pi-times', command: () => {
                }
            },
            {label: 'Angular.io', icon: 'pi pi-info'},
            {label: 'Setup', icon: 'pi pi-cog'}
        ];

    }

    async getOrd() {
        if (this.orderService.dataIsExist) {
            this.updateData()
        } else {
            this.orderRequest = this.filterService.getOrderRequest()
            this.orderRequest.detailId = null
            this.orderRequest.workStatus = 2
            this.orderRequest.onlyUser = true
            this.filterService.setOrderRequest(this.orderRequest)
            let ordersResponse = await this.apiService.post<TableOrderResponse>(
                'getListOFWork', this.filterService.getOrderRequest(),
                true, true
            );


            if (ordersResponse.status !== undefined &&
                ordersResponse.status !== -1) {
                this.orderService.setOrderResponse(ordersResponse)
                this.updateData()
            } else {
                this.apiService.normalizeError('')
                this.router.navigate(['/'])
            }
        }
    }

    start() {


        this.sec = 0
        setInterval(() => {
            this.sec++
            if (this.sec == 1500) {
                this.router.navigate(['/'])
            }
        }, 1000);
    }


    updateData() {
        this.data = this.orderService.getOrderResponse()
        // if (this.data.ordersTableBody !== undefined &&
        //     this.data.ordersTableBody !== null && this.data.ordersTableBody.length === 0) {
        //     this.appNavigate.toSelectWork();
        // } else {
        this.mainColumn = []
        this.data.columnTables.map(elem => {
            if (elem.nameColumn !== 'ID работы' &&
                elem.nameColumn !== 'статус' &&
                elem.nameColumn !== 'исполнители' &&
                elem.nameColumn !== 'выполн.до' &&
                elem.nameColumn !== 'автомобиль' &&
                elem.nameColumn !== 'деталь') {
                this.mainColumn.push(
                    {
                        field: elem.nameColumn,
                        header: elem.nameColumn,
                        type: elem.cellType,
                        width: elem.width < 100 ? elem.width + elem.nameColumn.length * 8 : elem.width + elem.nameColumn.length * 5
                    }
                )
            }
        })
        let tableBody = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellType === CellType.NUMBER) {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if (cell.cellType === CellType.DATE && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = data.getDate() + '.' + data.getMonth()+1 + '.' + data.getFullYear();
                } else {
                    tableRow[cell.cellName] = cell.cellData
                }
            })
            tableBody.push(tableRow)
        })

        let tableRowPattern: any = {}

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
        this.tableService.setMainData(tableBody)
        this.tableService.setTablePatternRow(tableRowPattern)
        this.tableDataService.setStartData(this.data)
        // }
    }

    async onUpdate() {
        this.data = await this.apiService.post<TableOrderResponse>(
            'getListOFWork', this.filterService.getOrderRequest(), false
            , this.enableLoading);

        let mainColumn = [];
        this.data.columnTables.map(elem => {
            mainColumn.push(
                {
                    field: elem.nameColumn,
                    header: elem.nameColumn,
                    type: elem.cellType,
                    width: elem.width < 100 ? elem.width + elem.nameColumn.length * 8 : elem.width + elem.nameColumn.length * 5
                }
            )
        })


        let tableBody = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellType === CellType.NUMBER) {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if (cell.cellType === CellType.DATE && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = data.getDate() + '.' + data.getMonth()+1 + '.' + data.getFullYear();
                } else {
                    tableRow[cell.cellName] = cell.cellData
                }
            })
            tableBody.push(tableRow)
        })
        let tableRowPattern: any = {}

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

        this.tableDataService.setStartData(this.data)
    }

}

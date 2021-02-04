import {Component, OnInit, Renderer2} from '@angular/core';
import {TableOrderResponse} from "../Service/table-order-response";
import {User} from "../Service/User";
import {TableDataService} from "../table-page/tableData.service";
import {OrderService} from "../orders-page/order.service";
import {Router} from "@angular/router";
import {FilterService} from "../widgets/filters/filter.service";
import {OrderRequest} from "../widgets/filters/order.request";
import {MenuItem} from "primeng/api";
import * as moment from "moment";
import {ApiDataServiceService} from "../Service/api-data-service.service";
import {CellType} from "../table-page/CellType";
import {TableData} from "../table-page/tableData";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-master-select-window',
    templateUrl: './master-select-window.component.html',
    styleUrls: ['./master-select-window.component.css']
})
export class MasterSelectWindowComponent implements OnInit {
    data: TableOrderResponse
    mainColumn: any[]
    listener1;
    listener2;
    listener3;
    sec: number
    secIncr: number = 1
    temp: any;
    statusName: string = ""
    tableData: TableData[]
    secUpdate: number = 0
    statusNoComp:string
    statusComp:string
    statusP:string
    statusPerformed :string
    buttItem: MenuItem[];
    private intervalUpdate: any
    private user: User;
    private orderRequest: OrderRequest
    private enableLoading: boolean = true

    constructor(public tableService: TableDataService,
                public orderService: OrderService,
                public renderer2: Renderer2,
                public tableDataService: TableDataService,
                private translate: TranslateService,
                public apiService: ApiDataServiceService,
                public filterService: FilterService,
                private router: Router) {

        this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
            this.translate.get('page.statusNoComp').subscribe((res: string) => {
                this.statusNoComp = res

            });
            this.translate.get('page.statusComp').subscribe((res: string) => {
                this.statusComp = res

            });
            this.translate.get('page.pause').subscribe((res: string) => {
                this.statusP = res

            });
            this.translate.get('page.statusPerformed').subscribe((res: string) => {
                this.statusPerformed = res

            });
        })

        this.translate.get('page.statusNoComp').subscribe((res: string) => {
            this.statusNoComp = res

        });
        this.translate.get('page.statusComp').subscribe((res: string) => {
            this.statusComp = res

        });
        this.translate.get('page.pause').subscribe((res: string) => {
            this.statusP = res

        });
        this.translate.get('page.statusPerformed').subscribe((res: string) => {
            this.statusPerformed = res

        });

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

        this.updateInfoOnSite()
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
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.detailId = null
        this.orderRequest.workStatus = 0
        this.orderRequest.onlyUser = false
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
        this.mainColumn = []

        this.data.columnTables.map(elem => {
            if (elem.nameColumn !== 'ID работы') {
                this.mainColumn.push(
                    {
                        field: elem.nameColumn,
                        type: elem.cellType,
                        header: elem.nameColumn,
                        width: elem.width < 100 ? elem.width + elem.nameColumn.length * 8 : elem.width + elem.nameColumn.length * 5
                    }
                )
            }

        })
        let tableBody = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellType === CellType.STATUS) {
                    this.statusName = cell.cellName
                    tableRow[cell.cellName] = cell.cellData
                } else if (cell.cellType === CellType.LOGIC) {
                    tableRow[cell.cellName] = cell.cellData.substr(22, 3)
                } else if (cell.cellType === CellType.NUMBER) {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if (cell.cellType === CellType.DATE && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = data.getDate() + '.' + (Number(data.getMonth())+1)+ '.' + data.getFullYear();
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
        this.tableData = tableBody
        this.tableService.setMainData(tableBody)
        this.tableService.setTablePatternRow(tableRowPattern)
        this.tableDataService.setStartData(this.data)

    }

    async onUpdate() {
        this.secUpdate = 0
        this.data = await this.apiService.post<TableOrderResponse>(
            'getListOFWork', this.filterService.getOrderRequest(), false
            , this.enableLoading);
        this.enableLoading = true

        let mainColumn = [];
        this.data.columnTables.map(elem => {
            if (elem.nameColumn !== 'ID работы') {

                mainColumn.push(
                    {
                        field: elem.nameColumn,
                        type: elem.cellType,
                        header: elem.nameColumn,
                        width: elem.width < 100 ? elem.width + elem.nameColumn.length * 8 : elem.width + elem.nameColumn.length * 5
                    }
                )
            }

        })
        let tableBody = []
        this.data.ordersTableBody.map(row => {
            let tableRow: any = {}
            row.rowData.map(cell => {
                if (cell.cellType === CellType.STATUS) {
                    this.statusName = cell.cellName
                    tableRow[cell.cellName] = this.convertByStatus(cell.cellData)
                } else if (cell.cellType === CellType.LOGIC) {
                    tableRow[cell.cellName] = cell.cellData.substr(22, 3)
                } else if (cell.cellType === CellType.NUMBER) {
                    tableRow[cell.cellName] = Number(cell.cellData)
                } else if (cell.cellType === CellType.DATE && !isNaN(new Date(cell.cellData).getDate())) {
                    let data = new Date(cell.cellData)
                    tableRow[cell.cellName] = data.getDate() + '.' + (Number(data.getMonth())+1)+ '.' + data.getFullYear();
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

        this.tableData = tableBody
        this.tableDataService.setMainData(tableBody)
        this.tableDataService.setTablePatternRow(tableRowPattern)

        this.tableDataService.setStartData(this.data)
    }


    updateInfoOnSite() {
        this.intervalUpdate = setInterval(() => {
            this.secUpdate++
            if (this.secUpdate === 7) {

                this.apiService.applySubLoading = false
                this.enableLoading = false
                this.onUpdate()
            }
        }, 1000);
    }

    ngOnDestroy() {
        clearInterval(this.intervalUpdate);
    }

    convertByStatus(str: string) {
        let result = "";
        switch (str) {
            case 'не выполнена':
                result = this.statusNoComp;
                break;
            case 'выполнена':
                result = this.statusComp;
                break;
            case 'выполняется':
                result = this.statusPerformed;
                break;
            case 'пауза':
                result = this.statusP;
                break;
        }
        return result;
    }

}

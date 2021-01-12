import {Injectable} from '@angular/core';
import {TableOrderResponse} from "./table-order-response";
import {ApiDataServiceService} from "./api-data-service.service";
import {OrderService} from "../orders-page/order.service";
import {Router} from "@angular/router";
import {TableDataService} from "../table-page/tableData.service";
import {FilterService} from "../widgets/filters/filter.service";
import {TranslateService} from "@ngx-translate/core";
import {OrderRequest} from "../widgets/filters/order.request";
import {SelectItem} from "primeng/api";
import {ListOption} from "../widgets/listbox/ListOption";

@Injectable({
    providedIn: 'root'
})
export class AppNavigateService {
    ordersResponse: TableOrderResponse
    orderRequest: OrderRequest
    indexSelect: number = -1
    public selected: SelectItem[];
    public optionsAdmin = [
        {
            id: 1,
            name: 'заказы',
            command: () => {
                this.toOrders()
            }, selected: false
        },
        {
            id: 2,
            name: 'работы', command: () => {
                this.toSelectWork()
            }, selected: true
        },
        {
            id: 3,
            name: 'работы на выполнении', command: () => {
                this.toListOfWork()
            }, selected: false
        }
    ];
    public optionsUser = [

        {
            id: 2,
            name: 'работы', command: () => {
                this.toSelectWork()
            }, selected: true
        },
        {
            id: 3,
            name: 'работы на выполнении', command: () => {
                this.toListOfWork()
            }, selected: false
        }
    ];

    public updateOptions(index) {
        if (this.indexSelect === -1) {
            this.indexSelect = index
        }

        if(this.apiService.adminMode){
            this.optionsAdmin.find(elem =>
                elem.id === this.indexSelect).selected = false
        }else {
            this.optionsUser.find(elem =>
                elem.id === this.indexSelect
            ).selected = false
        }

        if(this.apiService.adminMode){
            this.optionsAdmin.find(elem =>
                elem.id === index
            ).selected = true
        }else {
            this.optionsUser.find(elem =>
                elem.id === index
            ).selected = true
        }

        this.indexSelect = index
    }

    public justGoToListOfWork() {
        this.updateOptions(3)
        this.router.navigate(['/workPage'])
    }

    public justGoToSelectWork() {
        this.updateOptions(2)
        this.router.navigate(['/selectWork'])
    }

    public async toListOfWork() {
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.workStatus = 2
        this.orderRequest.detailId = null
        this.updateOptions(3)
        this.filterService.setOrderRequest(this.orderRequest)
        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getListOFWork', this.filterService.getOrderRequest(),
            true
        );
        if (this.ordersResponse.status !== -1) {
            this.orderService.setWorkResponse(this.ordersResponse)
            this.router.navigate(['/workPage'])
        } else {
            this.apiService.normalizeError('')
        }
    }

    public async toSelectWork() {
        this.updateOptions(2)
        this.orderRequest = this.filterService.getOrderRequest()
        this.orderRequest.workStatus = 0
        this.orderRequest.autoDetectionExecutor = true
        this.orderRequest.detailId = null

        this.filterService.setOrderRequest(this.orderRequest)
        this.ordersResponse = await this.apiService.post<TableOrderResponse>(
            'getListOFWork', this.filterService.getOrderRequest(),
            true
        );
        if (this.ordersResponse.status !== -1) {
            this.orderService.setWorkResponse(this.ordersResponse)
            this.router.navigate(['/selectWork'])
        } else {
            this.apiService.normalizeError('')
        }
    }


    async toOrders() {
        this.filterService.onDefaultValue()
        let data = await this.apiService.post<TableOrderResponse>(
            'getCroppedOrders', this.filterService.getOrderRequest(), true
        );
        this.tableService.setMainData([])
        this.orderService.setOrderResponse(data)
        this.updateOptions(1)
        this.router.navigate(['/order'])

    }

    constructor(public apiService: ApiDataServiceService,
                public orderService: OrderService,
                private router: Router,
                public tableService: TableDataService,
                public tableDataService: TableDataService,
                public filterService: FilterService,
                //   private ordersComponent:OrdersComponent,
                private translate: TranslateService) {

    }


}

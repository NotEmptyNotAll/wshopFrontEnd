import {EventEmitter, Injectable, Output} from '@angular/core';
import {OrderRequest} from "./order.request";
import {User} from "../../Service/User";
import * as moment from "moment";

@Injectable({
    providedIn: 'root'
})
export class FilterService {


    orderRequest: OrderRequest = {
        dateFrom: null,
        dateTo: null,
        searchString: null,
        customerId: null,
        employeeId: null,
        customerName: null,
        lang: null,
        state: null,
        status: null,
        sizeResponse: null,
        payed: null,
        user: null,
        rowStartIndex: null,
        workId: null,
        workStatus: null,
        workDateTo: null,
        workDateFrom: null,
        detailId: null,
        autoDetectionExecutor: true,
        closeDate: false
    }


    public onDefaultValue() {
        let dateFrom = moment().dayOfYear(moment().dayOfYear() - 7).utc().format("YYYY-MM-DD")
        let dateTo = moment(new Date()).utc().format("YYYY-MM-DD")
        this.orderRequest.dateTo = dateTo
        this.orderRequest.rowStartIndex = 0
        this.orderRequest.dateFrom = dateFrom
        this.orderRequest.state = 'UNCLOSED'
        this.orderRequest.sizeResponse = 15;
    }

    fastFilterTemp = {
        datePeriod: null,
        searchString: null,
        state: null
    }

    constructor() {
        // this.orderRequest.dateFrom = moment().utc().format("YYYY-MM-DD")
        // this.orderRequest.dateTo = moment().utc().format("YYYY-MM-DD")
        // this.orderRequest.state='UNCLOSED'
    }

    public clearFilter() {
        this.orderRequest.dateFrom = null
        this.orderRequest.dateTo = null
        this.orderRequest.searchString = null
        this.orderRequest.customerId = null
        this.orderRequest.employeeId = null
        this.orderRequest.customerName = null
        this.orderRequest.state = null
        this.orderRequest.status = null
        this.orderRequest.payed = null
        this.orderRequest.closeDate = false
    }

    public getOrderRequest(): OrderRequest {
        console.log(this.orderRequest)
        return this.orderRequest;
    }

    public setOrderRequest(value: OrderRequest) {
        console.log(value)
        this.orderRequest = value;
    }
}
